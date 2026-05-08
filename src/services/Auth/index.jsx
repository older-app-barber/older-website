import {sharedApi} from "../index.jsx";
const baseUrl = 'v1/auth';

export const AuthService = {
 async getProfileAsync () {
        try {
            const response = await sharedApi.post(baseUrl + '/profile')
            return response.data.data
        } catch (error) {
            console.warn(error?.message);
            throw error
        }
    },

    async loginWithCredentials({ email, password }) {
        try {
            const response = await sharedApi.post(`${baseUrl}/signin/manager/credentials`, {
                email,
                password,
                userAgent: 'web',
                marketplaceId: import.meta.env.VITE_MARKETPLACE_ID,
            });

            if (response.data.error) {
                throw new Error(response.data.message || 'Erro no login')
            }

            return response.data.data
        } catch (error) {
            console.error('[AuthService] Manager login error:', error.response?.data || error)

            if (error.response?.status === 403) {
                throw new Error('Acesso restrito a gestores autorizados')
            }

            if (error.response?.status === 500) {
                throw new Error('Erro interno no servidor. Tente novamente mais tarde.')
            }

            throw error
        }
    },

    async loginWithGoogle(credential) {
        try {
            const response = await sharedApi.post(`${baseUrl}/signin/manager/google`, {
                code: credential,
                userAgent: 'web',
                deviceId: 'web-client',
                marketplaceId: import.meta.env.VITE_MARKETPLACE_ID,
            });
            return response.data.data;
        } catch (error) {
            console.error('[AuthService] Google login error:', error);
            throw error;
        }
    },

    async getProfile() {
        try {
            const token = localStorage.getItem('authToken');
            const response = await sharedApi.post(`${baseUrl}/profile`, {
                accessToken: token,
            });
            return response.data.data;
        } catch (error) {
            console.error('[AuthService] Profile error:', error);
            throw error;
        }
    },

    async logout() {
        try {
            await sharedApi.post(`${baseUrl}/signout`);
        } catch (error) {
            console.error('[AuthService] Logout error:', error);
            throw error;
        }
    }
};