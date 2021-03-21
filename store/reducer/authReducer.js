import * as _ from "../types";

const initialState = {
  authenticating: false,
};

const authReducer = (state = initialState, action) => {
  const { type, authenticating } = action;
  switch (type) {
    case _.SIGNUP:
      return state;
    case _.SIGNUP_ERROR:
      return state;
    case _.SIGNIN:
      return state;
    case _.SIGNIN_ERROR:
      return state;
    case _.AUTHENTICATING:
      return { ...state, authenticating };
    default:
      return initialState;
  }
};

export default authReducer;
