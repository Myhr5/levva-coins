import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { LoginParams, LoginValues } from "../../domains/login";
import { RequestError } from "../../domains/request";

const authenticateUser = async ({ email, password }: LoginParams): Promise<LoginValues> => {
  return Api.post({
    url: "/user/auth",
    body: {
      email,
      password,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const LoginService = {
  authenticateUser,
};
