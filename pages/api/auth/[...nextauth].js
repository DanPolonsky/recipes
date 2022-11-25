import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
    // ...add more providers here
  ],
  callbacks:  {
    jwt: async ({ token, account}) => {
        if(account?.id_token){
            token.accessToken = account.id_token;
        }
        return Promise.resolve(token);
    },
    session: async ({ session, token }) => { 
      session.accessToken = token.accessToken;
      return Promise.resolve(session);
    },
},
  secret: process.env.SECRET,
}
export default NextAuth(authOptions)