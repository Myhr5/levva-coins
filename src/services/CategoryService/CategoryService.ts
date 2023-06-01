import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domains/request";
import { NewCategoryParams } from "../../domains/category";

const createCategory = async ({ description }: NewCategoryParams): Promise<void> => {
  return Api.post({
    url: "/category",
    body: {
      description,
    },
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const CategoryService = {
  createCategory,
};
