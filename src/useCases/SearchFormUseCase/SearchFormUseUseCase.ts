import { TransactionValues } from "../../domains/transaction";
import { SearchFormService } from "../../services/SearchFormService/SearchFormService";

import {
  loadTransaction,
  loadTransactionDone,
  loadTransactionFail,
} from "../../stores/TransactionStore/TransactionEvents";

import { SearchTransactionsParams } from "../../domains/transaction";
import { RequestError } from "../../domains/request";

const execute = async ({ searchInput }: SearchTransactionsParams): Promise<void> => {
  loadTransaction();

  return SearchFormService.searchFormService({ searchInput })
    .then((response: TransactionValues[]) => {
      loadTransactionDone(response);
    })
    .catch(({ hasError, message }: RequestError) => {
      loadTransactionFail({ hasError, message });
      throw new Error();
    });
};

const SearchFormUseCase = {
  execute,
};

export default SearchFormUseCase;
