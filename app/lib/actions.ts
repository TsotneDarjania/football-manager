"use server";

import { AuthError } from "next-auth";
import { signIn } from "../core/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: { email: string; password: string }
) {
  signIn("credentials", formData).then(
    (res) => {
      console.log("RESPONDDDDDDDDDDDDDDDDDDDDD");
      console.log(res);
    },
    (err) => {
      console.log("ERRORRRRRRRRRRRRRRRRRRRRRRRRRR");
      console.log(err);
    }
  );
  // try {
  //   await signIn("credentials", formData);
  // } catch (error) {
  //   if (error instanceof AuthError) {
  //     switch (error.type) {
  //       case "CredentialsSignin":
  //         return "Invalid credentials.";
  //       default:
  //         return "Something went wrong.";
  //     }
  //   }
  //   throw error;
  // }
}
