import { compare, hash } from "bcrypt";
import { prisma } from "lib/prisma";
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
      async authorize(credentials, req) {
        const { email, password, name, confirmPassword } = credentials as {
          email: string;
          password: string;
          name: string;
          confirmPassword: string;
        };
        // perform your login logic here

        // find out user from db
        // By unique identifier
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        // if not found then register the user
        if (!user) {
          if (password !== confirmPassword)
            throw new Error("Passwords does not match");

          const hashedPassword = await hash(password, 12);
          let newUser;
          newUser = await prisma.user.create({
            data: {
              email: email,
              password: hashedPassword,
              name: name,
            },
          });

          newUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          return {
            id: newUser?.id,
            email: newUser?.email,
            name: newUser?.name,
          } as any;
        } else {
          const isPasswordMatch = await compare(password, user.password);
          if (!isPasswordMatch) throw new Error("Invalid Email or Password");
        }

        return {
          id: user?.id,
          email: user?.email,
          name: user?.name,
        } as any;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
