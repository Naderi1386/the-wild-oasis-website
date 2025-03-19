import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest, GuestType } from "./app/_lib/data-service";

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
  callbacks: {
    async signIn(params) {
      try {
        const guest = await getGuest(params.user.email as string);
        if (!guest)
          await createGuest({
            email: params.user.email as string,
            fullName: params.user.name as string,
          });
        return true;
      } catch {
        return false;
      }
    },
    async session(params) {
      const guest = (await getGuest(params.session.user.email)) as GuestType;
      // @ts-expect-error error
      params.session.user.guestId = String(guest.id);
      return params.session;
    },
  },
});
