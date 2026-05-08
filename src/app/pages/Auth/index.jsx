// Import Dependencies
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// Local Imports
import logoWhite from "../../../assets/logos/logo_white.png"
import logoBlack from "../../../assets/logos/logo_black.png"
import { Button, Card, Input, InputErrorMsg } from "components/ui";
import { useAuthContext } from "app/contexts/auth/context";
import { schema } from "./schema";
import { Page } from "components/shared/Page";
import {GoogleLogin} from "@react-oauth/google";

// ----------------------------------------------------------------------



export default function SignIn() {
  const { login, errorMessage } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    login({
      username: data.username,
      password: data.password,
    });
  };

  const { loginWithGoogle} = useAuthContext();

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    await loginWithGoogle(token);
  };


  return (
    <Page title="Login">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            <img
                src={logoBlack}
                className="mx-auto size-56 block dark:hidden"
                alt="Logo Light"
            />

            <img
                src={logoWhite}
                className="mx-auto size-56 hidden dark:block"
                alt="Logo Dark"
            />

            <div className="">
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-dark-100">
                Seja bem-vindo
              </h2>
              <p className="text-gray-400 dark:text-dark-300">
                Entre com suas credenciais para continuar
              </p>
            </div>
          </div>
          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="space-y-4">
                <Input
                  label="E-mail"
                  placeholder="Insira seu e-mail"
                  prefix={
                    <EnvelopeIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("username")}
                  error={errors?.username?.message}
                />
                <Input
                  label="Senha"
                  placeholder="Insira sua senha"
                  type="password"
                  prefix={
                    <LockClosedIcon
                      className="size-5 transition-colors duration-200"
                      strokeWidth="1"
                    />
                  }
                  {...register("password")}
                  error={errors?.password?.message}
                />
              </div>

              <div className="mt-2">
                <InputErrorMsg when={!errorMessage}>
                  {errorMessage}
                </InputErrorMsg>
              </div>

              {/*<div className="mt-4 flex items-center justify-between space-x-2">
                <Checkbox label="Remember me" />
                <a
                  href="##"
                  className="text-xs text-gray-400 transition-colors hover:text-gray-800 focus:text-gray-800 dark:text-dark-300 dark:hover:text-dark-100 dark:focus:text-dark-100"
                >
                  Forgot Password?
                </a>
              </div>*/}

              <Button type="submit" className="mt-5 w-full" color="primary">
                Entrar
              </Button>
            </form>
            {/*<div className="mt-4 text-center text-xs+">
              <p className="line-clamp-1">
                <span>Dont have Account?</span>{" "}
                <Link
                  className="text-primary-600 transition-colors hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-600"
                  to="/pages/sign-up-v1"
                >
                  Create account
                </Link>
              </p>
            </div>*/}
            <div className="my-7 flex items-center space-x-3 text-xs rtl:space-x-reverse">
              <div className="h-px flex-1 bg-gray-200 dark:bg-dark-500"></div>
              <p>OU</p>
              <div className="h-px flex-1 bg-gray-200 dark:bg-dark-500"></div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => console.log("Google Login Failed")}
                    useOneTap
                />
              </div>
              {/*<Button className="h-10 flex-1 gap-3" variant="outlined">*/}
              {/*  <img className="size-5.5" src="/images/100x100.png" alt="logo" />*/}
              {/*  <span>Apple</span>*/}
              {/*</Button>*/}
            </div>
          </Card>
          <div className="mt-8 flex justify-center text-xs text-gray-400 dark:text-dark-300">
            <a href="##">Política de Privacidade</a>
            <div className="mx-2.5 my-0.5 w-px bg-gray-200 dark:bg-dark-500"></div>
            <a href="##">Termos de uso</a>
          </div>
        </div>
      </main>
    </Page>
  );
}
