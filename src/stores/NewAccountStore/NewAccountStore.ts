import { createStore } from "effector";

import { loadNewAccount, loadNewAccountDone, loadNewAccountFail } from "./NewAccountEvents";
import { NewAccountState } from "./NewAccountState";

const initialState: NewAccountState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

const NewAccountStore = createStore<NewAccountState>(initialState)
  .on(loadNewAccount, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: "",
  }))
  .on(loadNewAccountDone, () => ({
    isLoading: false,
    hasError: false,
    errorMessage: "",
  }))
  .on(loadNewAccountFail, (_, data) => ({
    isLoading: false,
    hasError: true,
    errorMessage: data.message,
  }));

export default NewAccountStore;
