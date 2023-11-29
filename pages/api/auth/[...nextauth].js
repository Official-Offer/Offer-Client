import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import {
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  AZURE_AD_CLIENT_ID,
  AZURE_AD_CLIENT_SECRET,
  AZURE_AD_TENANT_ID,
} from "@config/index";
var user_credential = [];

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
      scope:
        "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly",
    }),
    AzureADProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        console.log(token);
        console.log(account);
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log(token);
      console.log(user);
      console.log(session);
      session.user.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
      // user_credential = {
      //   provider: token.token.account.provider,
      // };
      // if (token.token.account.access_token) {
      //   user_credential["auth_token"] = token.token.account.access_token;
      // }
      // if (token.token.account.id_token) {
      //   user_credential["auth_token"] = token.token.account.id_token;
      // }
      // return user_credential;
    },
  },
});
