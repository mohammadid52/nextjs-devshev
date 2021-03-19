import { useState } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { MdClear } from "react-icons/md";
import { useFirebase } from "react-redux-firebase";

import { useForm } from "../hooks";
import { Meta } from "../components";
import { authActions } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const { signIn, signUp, logOut } = authActions;

const Auth = () => {
  //booleans
  const [securePass, setSecurePass] = useState(true);
  const [isSignup, setIsSignup] = useState(true);

  const state = useSelector((state) => state.auth);
  const { authenticating, error: _error } = state;

  const firebase = useFirebase();

  const [error, setError] = useState(_error);

  const dispatch = useDispatch();
  const shouldShowCancel = (field) => values[field].length > 0;

  const initialFields = {
    username: "",
    password: "",
    email: "",
  };

  const { handleChangeValue, ValidateEmail, values, resetField } = useForm(
    initialFields,
    setError
  );

  const { email, password, username } = values;
  const handleAction = (e) => {
    if (!email || !username || !password) {
      if (!email) {
        setError("Email is required");
        return;
      }
      if (!ValidateEmail(email)) {
        setError("Email is not valid");
        return;
      }
      if (!username) {
        setError("Username is required");
        return;
      }
      if (!password) {
        setError("Password is required");
        return;
      }
      if (password.length < 8) {
        setError("Password must be longer than 8 characters");
        return;
      }
    } else {
      e.preventDefault();

      if (isSignup) {
        dispatch(signUp(values, redirect));
      } else {
        dispatch(signIn(values));
      }
    }
  };

  const redirect = () => null;

  const ClearButton = ({ field, other = null }) => {
    return (
      <div className="absolute right-4">
        {shouldShowCancel(field) && (
          <button onClick={() => resetField(field)} className="">
            <MdClear color="rgb(55, 65, 81)" />
          </button>
        )}
        {other}
      </div>
    );
  };

  const signInWithGoogle = async () => {
    try {
      await firebase.login({ type: "redirect", provider: "google" });
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithGithub = async () => {
    try {
      await firebase.login({ type: "redirect", provider: "github" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{ background: "#0f3460" }}
      className="h-screen w-screen flex flex-col justify-center items-center"
    >
      <Meta
        description="signup to DevShev"
        keywords="signup to DevShev, signin to DevShev, login to DevShev, web development, React, next, components"
        title={`${isSignup ? "Sign up" : "Sign in"} to DevShev`}
      />
      <div className="">
        <h1 className="text-3xl font-semibold text-white text-center my-4">
          DevShev
        </h1>
        <main className="shadow-xl rounded w-96 h-auto bg-white">
          <div>
            <div className="flex items-center w-full rounded">
              <button
                onClick={() => setIsSignup(true)}
                className={`w-1/2 flex text-lg font-bold focus:outline-none flex-col items-center justify-center ${
                  !isSignup
                    ? " text-blue-900 bg-gray-50 shadow-inner border border-blue-300"
                    : "bg-white"
                } h-16`}
              >
                Sign up
              </button>
              <button
                onClick={() => setIsSignup(false)}
                className={`w-1/2 text-lg  font-bold flex flex-col focus:outline-none items-center justify-center ${
                  isSignup
                    ? "text-blue-900 bg-gray-50 shadow-inner border border-blue-300"
                    : "bg-white"
                } h-16`}
              >
                Sign in
              </button>
            </div>

            <div className="flex flex-col m-6 pb-8 px-4">
              <div className="w-full flex mb-4 items-center justify-center">
                <button
                  onClick={signInWithGoogle}
                  className="hover:bg-red-400 transition-all bg-red-500 rounded-md w-1/2 h-10 mr-2 flex items-center justify-center"
                >
                  <p className="text-white font-semibold">Google</p>
                </button>
                <button
                  onClick={signInWithGithub}
                  className="hover:bg-gray-700 transition-all bg-gray-800 rounded-md w-1/2 h-10 ml-2 flex items-center justify-center"
                >
                  <p className="text-white font-semibold">Github</p>
                </button>
              </div>
              <div className="h-12 border relative border-gray-300 flex items-center justify-start mb-4 rounded-md">
                <span className="h-full bg-gray-100 w-10 flex justify-center items-center border-r-2">
                  <AiOutlineUser color="rgb(55, 65, 81)" />
                </span>
                <input
                  value={username}
                  onChange={handleChangeValue}
                  name="username"
                  type="username"
                  placeholder={isSignup ? "Username" : "Username or email"}
                  className="px-3 outline-none text-gray-700 "
                />
                <ClearButton field="username" />
              </div>

              {isSignup && (
                <div className="h-12 border relative border-gray-300 flex items-center justify-start mb-4 rounded-md">
                  <span className="h-full bg-gray-100 w-10 flex justify-center items-center border-r-2">
                    <AiOutlineMail color="rgb(55, 65, 81)" />
                  </span>
                  <input
                    value={email}
                    onChange={handleChangeValue}
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="px-3 outline-none text-gray-700"
                  />
                  <ClearButton field="email" />
                </div>
              )}
              <div
                className={`h-12 border relative border-gray-300 flex items-center justify-start rounded-md ${
                  error ? "mb-3" : "mb-5"
                }`}
              >
                <span className="h-full bg-gray-100 w-10 flex justify-center items-center border-r-2">
                  <AiOutlineLock color="rgb(55, 65, 81)" />
                </span>
                <input
                  value={password}
                  onChange={handleChangeValue}
                  name="password"
                  placeholder="Password"
                  type={securePass ? "password" : ""}
                  className="px-3 outline-none text-gray-700"
                />
                <ClearButton
                  field="password"
                  other={
                    <button
                      onClick={() => setSecurePass(!securePass)}
                      className="ml-2"
                    >
                      {securePass ? (
                        <AiOutlineEye color="rgb(55, 65, 81)" />
                      ) : (
                        <AiOutlineEyeInvisible color="rgb(55, 65, 81)" />
                      )}
                    </button>
                  }
                />
              </div>
              {error && (
                <div className="mb-2">
                  <p className="text-red-600 text-md text-center italic font-medium">
                    {error}
                  </p>
                </div>
              )}
              <button
                onClick={handleAction}
                className={`bg-blue-${
                  authenticating ? "500" : "600"
                } hover:bg-blue-500 transition-all h-12 flex items-center justify-center mb-2 rounded-md`}
              >
                <p className="text-white font-semibold">
                  {authenticating
                    ? "Authenticating"
                    : isSignup
                    ? "Sign up"
                    : "Sign in"}
                </p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
