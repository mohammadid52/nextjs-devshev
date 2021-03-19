import "../styles/tailwind.css";
import "tailwindcss/tailwind.css";
import "react-notifications-component/dist/theme.css";

import { Provider } from "react-redux";
import firebase from "../firebase";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";

import { Layout } from "../components";
import store from "../store";
import { rrfConfig } from "../config";

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default MyApp;
