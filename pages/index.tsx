import { getSession, GetSessionParams, useSession } from "next-auth/react";
import type { NextPage } from "next";
import Head from "next/head";
import { Session } from "next-auth";
import { Props } from "next/script";

interface HomeProps {
  s: Session;
}

const Home: NextPage<HomeProps> = ({ s: session }) => {
  return (
    <div className="flex flex-col h-screen items-center">
      <Head>
        <title>Search Recipes</title>
      </Head>
      <header className="text-center text-indigo-500 font-bold font-mono mt-20 text-4xl sm:text-6xl md:text-8xl">
        Hey {session?.user?.name}! <br />
        Search Recipes Here
      </header>
      <input
        type="text"
        placeholder="Search..."
        className="text-xl md:text-2xl font-semibold bg-slate-50 text-blue-600 font-mono w-9/12 md:w-5/12 h-16 p-4 rounded-full mt-32 border-4 border-indigo-300 focus:outline-none focus:border-indigo-500 hover:border-indigo-500"
      />
    </div>
  );
};

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { s: session },
  };
}

export default Home;
