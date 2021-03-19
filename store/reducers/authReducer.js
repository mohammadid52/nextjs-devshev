import * as types from "../types";
import { notification } from "../../utils";

const initialState = {
  authenticating: false,
  error: null,
};

const authReducer = (state = initialState, { message, type, value }) => {
  switch (type) {
    case types.SIGNUP:
      return state;
    case types.SIGNUP_ERROR:
      return { ...state, error: message };
    case types.SIGNIN:
      return state;
    case types.SIGNIN_ERROR:
      return { ...state, error: message };

    case types.AUTHENTICATING:
      return {
        ...state,
        authenticating: value,
      };

    default:
      return initialState;
  }
};

export default authReducer;
