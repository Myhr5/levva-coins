import { TransactionService } from "../../services/TransactionService/TransactionService";

import {
  loadCreateTransactionDone,
  loadTransaction,
  loadTransactionFail,
} from "../../stores/TransactionStore/TransactionEvents";

import { NewTransactionParams } from "../../domains/transaction";
import { RequestError } from "../../domains/request";

const execute = async ({
  description,
  amount,
  type,
  categoryId,
}: NewTransactionParams): Promise<void> => {
  loadTransaction();

  return TransactionService.createTransaction({
    description,
    amount,
    type,
    categoryId,
  })
    .then(({ id, createdAt }: any) => {
      loadCreateTransactionDone([
        { id, description, amount, type, category: { id: categoryId, description }, createdAt },
      ]);
    })
    .catch(({ hasError, message }: RequestError) => {
      loadTransactionFail({ hasError, message });
      throw new Error();
    });
};

const newTransactionUseCase = {
  execute,
};

export default newTransactionUseCase;
