import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domains/request";
import { ProfileParams } from "../../domains/profile";

const updateUser = async ({ id, name }: ProfileParams): Promise<void> => {
  return Api.put({
    url: `/user/${id}`,
    body: {
      name,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const ProfileService = {
  updateUser,
};
