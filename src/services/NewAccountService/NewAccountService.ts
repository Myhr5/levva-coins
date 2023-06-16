import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { NewAccountParams } from "../../domains/newAccount";
import { RequestError } from "../../domains/request";

const createUser = async ({ name, email, password }: NewAccountParams): Promise<void> => {
  return Api.post({
    url: "/user",
    body: {
      name,
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

export const NewAccountService = {
  createUser,
};
