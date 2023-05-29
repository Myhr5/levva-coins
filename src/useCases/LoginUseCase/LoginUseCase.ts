import { LoginParams, LoginValues } from "../../domain/login";
import { RequestError } from "../../domain/request";
import { LoginService } from "../../services/LoginService/LoginService";

const execute = async ({ email, password }: LoginParams): Promise<void> => {
  const errorCallback = ({ hasError, message }: RequestError) => {
    //fazer algo com o erro
  };

  return LoginService.authenticateUser({ email, password }).then((user: LoginValues) => {
    window.localStorage.setItem("user", JSON.stringify(user));

    //armazenar os dadod do usuario com o effector (store global ou dados globais)

    //navegar o usuario logado para a home
  });
};

const LoginUseCase = {
  execute,
};

export default LoginUseCase;
