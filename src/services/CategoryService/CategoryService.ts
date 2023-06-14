import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domains/request";
import { CategoryValues, NewCategoryParams } from "../../domains/category";

const createCategory = async ({ description }: NewCategoryParams): Promise<CategoryValues[]> => {
  return Api.post({
    url: "/category",
    body: {
      description,
    },
  })
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const getCategories = async (): Promise<CategoryValues[]> => {
  return Api.get({
    url: "/category",
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
  getCategories,
};
