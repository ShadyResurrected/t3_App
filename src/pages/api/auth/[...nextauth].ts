import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // perform your login logic here
        // find out user from db
        if (email !== "cchandra554@gmail.com" || password !== "1234") {
          throw new Error("invalid credentials");
        }

        return {
          id: "1234",
          name: "Chandradeep Chandra",
          email: "cchandra554@gmail.com",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
