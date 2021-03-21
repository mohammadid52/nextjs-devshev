import { useSelector } from "react-redux";
import Navigation from "./Navigation";

const Layout = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  const { uid, isEmpty, isLoaded } = auth;
  const shouldShowNavigation = isLoaded && !isEmpty && uid;
  return (
    <div className="h-screen relative w-screen m-0 p-0 box-border overflow-hidden">
      {shouldShowNavigation && <Navigation />}
      {children}
    </div>
  );
};

export default Layout;
