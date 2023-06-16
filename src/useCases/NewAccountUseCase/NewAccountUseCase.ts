import { NewAccountService } from "../../services/NewAccountService/NewAccountService";

import {
  loadNewAccount,
  loadNewAccountDone,
  loadNewAccountFail,
} from "../../stores/NewAccountStore/NewAccountEvents";

import { router } from "../../Router";

import { NewAccountParams } from "../../domains/newAccount";
import { RequestError } from "../../domains/request";

const execute = async ({ name, email, password }: NewAccountParams): Promise<void> => {
  loadNewAccount();

  return NewAccountService.createUser({
    name,
    email,
    password,
  })
    .then(() => {
      loadNewAccountDone();

      router.navigate("/login");
    })
    .catch(({ hasError, message }: RequestError) => {
      loadNewAccountFail({ hasError, message });
      throw new Error();
    });
};

const newAccountUseCase = {
  execute,
};

export default newAccountUseCase;
