import { createEvent } from "effector";

import { RequestError } from "../../domains/request";

export const loadProfile = createEvent("loadProfile");
export const loadProfileDone = createEvent("loadProfileDone");
export const loadProfileFail = createEvent<RequestError>("loadProfileFail");
