import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const AuthWrapper = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  const { uid, isEmpty, isLoaded } = auth;
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isEmpty && !uid) {
      router.push("/auth");
      return;
    }
  }, [uid, isEmpty, isLoaded]);

  return children;
};

export default AuthWrapper;
