import Head from "next/head";
import Link from "next/link";
import { useSelector } from "react-redux";
// import styles from "../Ostyles/Home.module.css";

export default function Home({ res }) {
  const state = useSelector((state) => state.firebase.auth);
  const { isEmpty, isLoaded, uid } = state;
  const currentUser = !isEmpty && isLoaded && uid;

  console.log(res);

  return (
    <>
      <div>
        <Head>
          <title>DevShev</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="h-screen w-full bg-white flex flex-col justify-center items-center">
          <h1 className="text-xl dark-text-color">Home</h1>
          <button className="border py-1 px-3 rounded-lg bg-blue-200">
            <Link href="/auth">
              <p className="text-blue-700">Login</p>
            </Link>
          </button>
        </main>
      </div>
    </>
  );
}

export const getInitialProps = ({ res }) => {
  return {
    props: res,
  };
};
