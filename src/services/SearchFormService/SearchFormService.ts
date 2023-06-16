import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domains/request";
import { TransactionValues } from "../../domains/transaction";
import { SearchParams } from "../../domains/search";

const searchFormService = async ({ searchInput }: SearchParams): Promise<TransactionValues[]> => {
  if (searchInput == "") {
    return Api.get({
      url: "/transaction/list",
    })
      .then(response => {
        return response.data;
      })
      .catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
      });
  } else {
    return Api.get({
      url: `/transaction/${searchInput}`,
    })
      .then(response => {
        return response.data;
      })
      .catch((err: AxiosError<RequestError>) => {
        throw err.response?.data;
      });
  }
};

export const SearchFormService = {
  searchFormService,
};
