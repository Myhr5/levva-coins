import { TransactionValues } from "../../domains/transaction";
import { TransactionService } from "../../services/TransactionService/TransactionService";

import {
  loadTransaction,
  loadTransactionDone,
  loadTransactionFail,
} from "../../stores/TransactionStore/TransactionEvents";

import { SearchTransactionsParams } from "../../domains/transaction";
import { RequestError } from "../../domains/request";

const execute = async ({ searchInput }: SearchTransactionsParams): Promise<void> => {
  loadTransaction();

  return TransactionService.searchTransactions(searchInput)
    .then((transactions: TransactionValues[]) => {
      loadTransactionDone(transactions);
    })
    .catch(({ hasError, message }: RequestError) => {
      loadTransactionFail({ hasError, message });
    });
};

const GetTransactiosnUseCase = {
  execute,
};

export default GetTransactiosnUseCase;
