// auth.ts (at the root of your project)

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { databaseAPI } from "@lib/DatabaseAPI";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        await databaseAPI.initialize();
        try {
          const user = await databaseAPI.verifyUserCredentials(
            credentials.email,
            credentials.password
          );
          if (user) {
            return {
              id: user.id.toString(),
              email: user.email,
              name: user.name,
              credits: user.credits,
            };
          }
          return null;
        } catch (error) {
          console.error("Error authorizing user:", error);
          return null;
        } finally {
          await databaseAPI.close();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.credits = user.credits;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.credits = token.credits as number;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET, // Ensure you use AUTH_SECRET for v5
});