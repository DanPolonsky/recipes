import {
  getSession,
  GetSessionParams,
  signIn,
  getProviders,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { BuiltInProviderType } from "next-auth/providers";

interface SignInProps {
  s: Session;
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

const SignIn: NextPage<SignInProps> = ({ s: session, providers }) => {
  const router = useRouter();
  if (session) {
    router.replace("/");
  }

  return (
    <div className="flex flex-col h-screen items-center">
      <Head>
        <title>Search Recipes</title>
      </Head>
      <header className="text-center text-indigo-500 font-bold font-mono mt-20 text-4xl sm:text-6xl md:text-8xl">
        Sign In
      </header>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { s: session },
  };
}
export default SignIn;
