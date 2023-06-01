import { createEvent } from "effector";

import { RequestError } from "../../domains/request";

export const loadLogin = createEvent("loadLogin");
export const loadLoginDone = createEvent("loadLoginDone");
export const loadLoginFail = createEvent<RequestError>("loadLoginFail");
