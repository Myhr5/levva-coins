import { createEvent } from "effector/effector.mjs";

import { RequestError } from "../../domains/request";
import { LoginValues } from "../../domains/login";

export const loadNewAccount = createEvent("loadNewAccount");
export const loadNewAccountDone = createEvent("loadNewAccountDone");
export const loadNewAccountFail = createEvent<RequestError>("loadNewAccountFail");
