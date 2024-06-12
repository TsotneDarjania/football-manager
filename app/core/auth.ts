import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { supabaseGetUser } from "./user";

type User = {
  email: string;
  password: string;
};

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user: { data: any } = await supabaseGetUser(email);
    if (!user || !user.data || !user.data[0]) return undefined;
    return {
      email: user.data[0].email,
      password: user.data[0].password,
    };
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUser(email as string);

        if (!user) return null;

        if (password === user.password) {
          return user;
        }
        // const passwordsMatch = await bcryptjs.compare(
        //   password as string,
        //   user.password
        // );

        // console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
