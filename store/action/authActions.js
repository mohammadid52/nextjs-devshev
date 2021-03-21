import * as _ from "../types";
import { auth } from "../../firebase";

export const signUp = (creds, onSuccess) => async (dispatch) => {
  dispatch({ type: _.AUTHENTICATING, authenticating: true });
  const { email, password } = creds;
  try {
    await auth.createUserWithEmailAndPassword(email, password);
    dispatch({ type: _.SIGNUP });
  } catch (error) {
    dispatch({ type: _.SIGNUP_ERROR, error: error.message });
  } finally {
    dispatch({ type: _.AUTHENTICATING, authenticating: false });
    if (onSuccess) onSuccess();
  }
};

export const signIn = (creds, onSuccess) => async (dispatch) => {
  dispatch({ type: _.AUTHENTICATING, authenticating: true });
  const { email, password } = creds;
  try {
    dispatch({ type: _.SIGNIN });
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    dispatch({ type: _.SIGNIN_ERROR, error: error.message });
  } finally {
    dispatch({ type: _.AUTHENTICATING, authenticating: false });
    if (onSuccess) onSuccess();
  }
};

export const logOut = (onSuccess) => async (dispatch) => {
  dispatch({ type: _.LOGOUT });
  try {
    await auth.signOut();
    if (onSuccess) onSuccess();
  } catch (error) {
    dispatch({ type: _.LOGOUT_ERROR, error: error.message });
  }
};
