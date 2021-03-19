import { firestore, auth } from "../../firebase";
import * as types from "../types";

const userRef = (docId) =>
  firestore.collection("users").doc(docId).collection("userDetails");

export const signUp = (credentials, redirect) => async (dispatch) => {
  dispatch({ type: types.AUTHENTICATING, value: true });
  const { username, email, password } = credentials;
  try {
    const createdUser = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    createdUser.user.updateProfile({
      displayName: username,
    });
    const { uid } = createdUser.user;
    await userRef(uid).add({
      ...credentials,
      uid,
    });
    dispatch({ type: types.SIGNUP });
    if (redirect) redirect();
  } catch (error) {
    dispatch({ type: types.SIGNUP_ERROR, message: error.message });
  } finally {
    dispatch({ type: types.AUTHENTICATING, value: false });
  }
};
export const signIn = (credentials, redirect) => async (dispatch) => {
  dispatch({ type: types.AUTHENTICATING, value: true });
  const { email, password } = credentials;
  try {
    await auth.signInWithEmailAndPassword(email, password);
    if (redirect) redirect();
    dispatch({ type: types.SIGNIN });
  } catch (error) {
    dispatch({ type: types.SIGNIN_ERROR, message: error.message });
  } finally {
    dispatch({ type: types.AUTHENTICATING, value: false });
  }
};

export const logOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const test = () => {
  console.log("success");
};
