import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export interface UserAuthType {
  name: string;
  email: string;
  image: string;
}

export interface AuthType {
  user: UserAuthType;
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
});
