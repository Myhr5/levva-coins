import { createStore } from "effector/effector.mjs";

import { loadProfile, loadProfileDone, loadProfileFail } from "./ProfileEvents";
import { ProfileState } from "./ProfileState";

const initialState: ProfileState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
};

const ProfileStore = createStore<ProfileState>(initialState)
  .on(loadProfile, state => ({
    ...state,
    isLoading: true,
    hasError: false,
    errorMessage: "",
  }))
  .on(loadProfileDone, state => ({
    ...state,
    isLoading: false,
    hasError: false,
    errorMessage: "",
  }))
  .on(loadProfileFail, (_, data) => ({
    isLoading: false,
    hasError: data.hasError,
    errorMessage: data.message,
  }));

export default ProfileStore;
