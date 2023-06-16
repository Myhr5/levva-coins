import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domains/request";
import { NewTransactionParams, TransactionValues } from "../../domains/transaction";

const createTransaction = async ({
  description,
  amount,
  type,
  categoryId,
}: NewTransactionParams): Promise<TransactionValues[]> => {
  return Api.post({
    url: "/transaction",
    body: {
      description,
      amount,
      type,
      categoryId,
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

const getTransactions = async (): Promise<TransactionValues[]> => {
  return Api.get({
    url: "/transaction/list",
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const searchTransactions = async (searchInput: string): Promise<TransactionValues[]> => {
  return Api.get({
    url: `/transaction/${searchInput}`,
  })
    .then(response => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

export const TransactionService = {
  createTransaction,
  getTransactions,
  searchTransactions,
};
