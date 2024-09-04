import Head from "next/head";
import { Inter } from "next/font/google";

import { SignupForm } from 'src/components/signup/SignupForm';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Clario Test App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <SignupForm />
      </main>
    </>
  );
}
