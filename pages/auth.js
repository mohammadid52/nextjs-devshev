import { useEffect, useState } from "react";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { MdClear } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

import { useForm } from "../hooks";
import { Meta } from "../components";
import { authActions } from "../store/action";

const { signIn, signUp } = authActions;

const InputField = ({
  placeholder,
  onChange,
  value,
  icon: Icon,
  field,
  classes = "",
  other,
  ClearButton,
  password,
}) => {
  return (
    <div
      className={`h-12 overflow-hidden relative flex items-center justify-start mb-4 rounded-md bg-white border border-gray-300 ${classes}`}
    >
      <span className="h-full w-10 flex justify-center border-r border-gray-300 items-center bg-inherit">
        {<Icon color="#1f4068" />}
      </span>
      <input
        value={value}
        onChange={onChange}
        name={field}
        type={field === "password" ? password : field}
        placeholder={placeholder}
        style={{ caretColor: "red", color: "var(--dark-1)" }}
        className="px-3 outline-none h-full bg-inherit font-medium placeholder-gray-300"
      />
      {other || <ClearButton field={field} />}
    </div>
  );
};

const Auth = () => {
  //booleans
  const [securePass, setSecurePass] = useState(true);
  const [isSignup, setIsSignup] = useState(true);

  const firebase = useFirebase();

  const dispatch = useDispatch();
  const { authenticating } = useSelector((state) => state.firebase.auth);

  const [error, setError] = useState(null);

  const auth = useSelector((state) => state.firebase.auth);
  const { uid, isEmpty, isLoaded } = auth;
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isEmpty && uid) {
      router.push("/");
      return;
    }
  }, [uid, isEmpty, isLoaded]);

  const shouldShowCancel = (field) => values[field].length > 0;

  const initialFields = {
    username: "",
    password: "",
    email: "",
  };

  const {
    handleChangeValue,
    clearAllFields,
    ValidateEmail,
    values,
    resetField,
  } = useForm(initialFields, setError);

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
        dispatch(signUp(values, () => router.push("/")));
      } else {
        dispatch(signIn(values, () => router.push("/")));
      }
    }
  };

  const ClearButton = ({ field, other = null }) => {
    return (
      <div className="absolute right-4">
        {shouldShowCancel(field) && (
          <button onClick={() => resetField(field)} className="">
            <MdClear color="var(--dark-1)" />
          </button>
        )}
        {other}
      </div>
    );
  };

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center bg-dark-1">
      <Meta
        description="signup to DevShev"
        keywords="signup to DevShev, signin to DevShev, login to DevShev, web development, React, next, components"
        title={`${isSignup ? "Sign up" : "Sign in"} to DevShev`}
      />
      <div className="">
        <h1 className="text-3xl font-semibold text-white text-center my-4">
          DevShev
        </h1>
        <main className="shadow-xl rounded-lg w-96 h-auto bg-white">
          <div>
            <div className="flex items-center w-full">
              <button
                onClick={() => setIsSignup(true)}
                className={`w-1/2 flex rounded-tl-lg text-lg font-medium focus:outline-none flex-col items-center justify-center ${
                  !isSignup ? "inner-shadeow bg-gray-50" : "bg-white"
                } h-16`}
              >
                Sign up
              </button>
              <button
                onClick={() => setIsSignup(false)}
                className={`w-1/2 text-lg font-medium rounded-tr-lg flex flex-col focus:outline-none items-center justify-center ${
                  isSignup ? "inner-shadoew bg-gray-50" : "bg-white"
                } h-16`}
              >
                Sign in
              </button>
            </div>

            <div className="flex flex-col m-6 pb-8 px-4">
              <div className="w-full flex mb-4 items-center justify-center">
                <button
                  onClick={() =>
                    firebase.login({ provider: "google", type: "redirect" })
                  }
                  className="hover:bg-red-600 transition-all bg-red-600 rounded-md w-1/2 h-10 mr-2 flex items-center justify-center"
                >
                  <p className="text-white font-semibold">Google</p>
                </button>
                <button
                  onClick={() =>
                    firebase.login({ provider: "github", type: "redirect" })
                  }
                  className="hover:bg-gray-700 transition-all bg-gray-800 rounded-md w-1/2 h-10 ml-2 flex items-center justify-center"
                >
                  <p className="text-white font-semibold">Github</p>
                </button>
              </div>
              {isSignup && (
                <InputField
                  icon={AiOutlineUser}
                  value={username}
                  placeholder={"Username"}
                  field="username"
                  onChange={handleChangeValue}
                  ClearButton={ClearButton}
                />
              )}

              <InputField
                icon={AiOutlineMail}
                value={email}
                placeholder={"Email"}
                field="email"
                onChange={handleChangeValue}
                ClearButton={ClearButton}
              />

              <InputField
                icon={AiOutlineLock}
                value={password}
                placeholder={"Password"}
                field={"password"}
                password={securePass ? "password" : "text"}
                onChange={handleChangeValue}
                ClearButton={ClearButton}
                classes={error ? "mb-3" : "mb-5"}
                other={
                  <ClearButton
                    field="password"
                    other={
                      <button
                        onClick={() => setSecurePass(!securePass)}
                        className="ml-2"
                      >
                        {securePass ? (
                          <AiOutlineEye color="var(--dark)" />
                        ) : (
                          <AiOutlineEyeInvisible color="var(--dark)" />
                        )}
                      </button>
                    }
                  />
                }
              />

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
              <div className="text-right text-blue-700 underline">
                <Link href="/">
                  <p className="text-sm">Forgot Password</p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
