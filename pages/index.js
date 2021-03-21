import Head from "next/head";
import Link from "next/link";

import { AuthWrapper, Navigation } from "../components";

export default function Home({}) {
  return (
    <AuthWrapper>
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
    </AuthWrapper>
  );
}
