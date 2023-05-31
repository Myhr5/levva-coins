import { router } from "../../Router";
import { LoginParams, LoginValues } from "../../domain/login";
import { RequestError } from "../../domain/request";
import { LoginService } from "../../services/LoginService/LoginService";
import { loadLogin, loadLoginDone, loadLoginFail } from "../../stores/LoginStore/LoginEvents";

const execute = async ({ email, password }: LoginParams): Promise<void> => {
  loadLogin();

  return LoginService.authenticateUser({ email, password })
    .then((user: LoginValues) => {
      window.localStorage.setItem("user", JSON.stringify(user));

      loadLoginDone();

      //navegar o usuario logado para a home
      router.navigate("/home");
    })
    .catch(({ hasError, message }: RequestError) => {
      loadLoginFail({ hasError, message });
    });
};

const LoginUseCase = {
  execute,
};

export default LoginUseCase;
