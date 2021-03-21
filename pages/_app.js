import "../styles/globals.css";
import "tailwindcss/tailwind.css";

import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { firebase } from "../firebase";
import { createFirestoreInstance } from "redux-firestore";

import { Layout } from "../components";
import { rrfConfig } from "../config";
import store from "../store";

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
