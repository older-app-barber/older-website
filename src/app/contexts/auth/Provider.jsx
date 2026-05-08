// Import Dependencies
import { useEffect, useReducer } from "react"
import isObject from "lodash/isObject"
import PropTypes from "prop-types"
import isString from "lodash/isString"

// Local Imports
import { isTokenValid, setSession } from "utils/jwt"
import { AuthContext } from "./context"
import { storeAuthData, getStoredUserData, clearAuthData } from 'app/contexts/auth/authStorage.js'
import {AuthService} from "../../../services/Auth/index.jsx"
import {toast} from "sonner"

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
}

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },

  UPDATE_USER: (state, action) => {
    const { user } = action.payload
    return {
      ...state,
      user: {
        ...state.user,
        ...user
      }
    }
  },

  LOGIN_REQUEST: (state) => {
    return {
      ...state,
      isLoading: true,
    }
  },

  LOGIN_SUCCESS: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
    }
  },

  LOGIN_ERROR: (state, action) => {
    const { errorMessage } = action.payload;
    return {
      ...state,
      errorMessage,
      isLoading: false,
    }
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
}

const reducer = (state, action) => {
  const handler = reducerHandlers[action.type]
  if (handler) {
    return handler(state, action)
  }
  return state
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateUser = (updatedUserData) => {
    dispatch({
      type: "UPDATE_USER",
      payload: {
        user: updatedUserData
      }
    })

    const authToken = localStorage.getItem("authToken")
    const refreshToken = localStorage.getItem("refreshToken")
    if (authToken && refreshToken) {
      storeAuthData(authToken, refreshToken, {
        ...state.user,
        ...updatedUserData
      })
    }
  }

  useEffect(() => {
    const init = async () => {
      const authToken = localStorage.getItem("authToken")
      const refreshToken = localStorage.getItem("refreshToken")
      const storedUser = getStoredUserData()

      if (authToken && isTokenValid(authToken)) {
        setSession(authToken, refreshToken)

        try {
          const userData = await AuthService.getProfile()

          const mergedUserData = {
            ...(storedUser || {}),
            ...(userData || {})
          }

          storeAuthData(authToken, refreshToken, mergedUserData)

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: mergedUserData
            },
          })
        } catch {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: storedUser
            },
          })
        }
      } else {
        clearAuthData();
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    init()
  }, [])

  const loginWithGoogle = async (credential) => {
    dispatch({ type: "LOGIN_REQUEST" })

    try {
      const response = await AuthService.loginWithGoogle(credential)
      const { user } = response
      const authToken = user.session.accessToken
      const refreshToken = user.session.refreshToken

      if (!isString(authToken) && !isObject(user)) {
        throw new Error("Resposta inválida do servidor")
      }

      storeAuthData(authToken, refreshToken, user)
      setSession(authToken, refreshToken)

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user },
      });
    } catch (err) {
      const status = err.response?.status
      const fallbackMessage = err.message || "Erro no login com Google"

      let errorMessage = fallbackMessage

      if (status === 401 || status === 403) {
        errorMessage = "Acesso restrito a gestores autorizados"
      } else if (status === 500) {
        errorMessage = "Erro interno no servidor. Tente novamente mais tarde."
      }

      toast.error(errorMessage, {
        className: "soft-color",
      })

      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          errorMessage,
        },
      })
    }
  }

  const login = async ({ username, password }) => {
    dispatch({ type: "LOGIN_REQUEST" })

    try {
      const response = await AuthService.loginWithCredentials({
        email: username,
        password
      })

      const { user } = response
      const authToken = user?.session?.accessToken
      const refreshToken = user?.session?.refreshToken

      if (!isString(authToken) || !isObject(user)) {
        throw new Error("Resposta inválida do servidor")
      }

      storeAuthData(authToken, refreshToken, user);
      setSession(authToken, refreshToken);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user },
      });
    } catch (err) {
      const status = err.response?.status;
      const fallbackMessage = err.message || "Erro ao realizar login"

      let errorMessage = fallbackMessage;

      if (status === 401 || status === 403) {
        errorMessage = "Acesso restrito a gestores autorizados"
      } else if (status === 500) {
        errorMessage = "Erro interno no servidor. Tente novamente mais tarde."
      }

      toast.error(errorMessage, {
        className: "soft-color",
      })

      dispatch({
        type: "LOGIN_ERROR",
        payload: {
          errorMessage,
        },
      })
    }
  }

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.error("Erro durante logout:", err);
    } finally {
      clearAuthData();
      setSession(null);
      dispatch({ type: "LOGOUT" });
    }
  }

  if (!children) {
    return null;
  }

  return (
      <AuthContext
          value={{
            ...state,
            login,
            logout,
            loginWithGoogle,
            updateUser,
          }}
      >
        {children}
      </AuthContext>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}
