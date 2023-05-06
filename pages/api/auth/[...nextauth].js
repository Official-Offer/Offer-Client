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
    }),
    AzureADProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
    }),
  ],
  // callbacks: {
  //   async jwt(token, user, account, profile, isNewUser) {
  //     var user_token = token.token.account;
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     user_credential = {
  //       provider: token.token.account.provider,
  //     };
  //     if (token.token.account.access_token) {
  //       user_credential["auth_token"] = token.token.account.access_token;
  //     }
  //     if (token.token.account.id_token) {
  //       user_credential["auth_token"] = token.token.account.id_token;
  //     }
  //     return user_credential;
  //   },
  // },
});
