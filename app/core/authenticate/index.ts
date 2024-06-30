import supabase from "@/app/services/supabase/config";
import { Dispatch, SetStateAction } from "react";

export async function Registration(data: { email: string; userName: string }) {
  //check if username is not taken
  const query = await supabase
    .from("Users")
    .select("email")
    .eq("email", data.email);

  if (query.data!.length > 0) {
    return "already taken";
  }

  // create user
  const { error } = await supabase
    .from("Users")
    .insert({ email: data.email, userName: data.userName });

  const user = { email: data.email, userName: data.userName };
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

  document.cookie = `user=${JSON.stringify(
    user
  ).toString()}; expires=${expires}; path=/`;

  return "success";
}

export async function logIn(email: string) {
  const query = await supabase
    .from("Users")
    .select("email, userName")
    .eq("email", email);

  console.log(query);

  if (query.data!.length > 0) {
    const user = {
      email: query.data![0].email,
      userName: query.data![0].userName,
    };
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    document.cookie = `user=${JSON.stringify(
      user
    ).toString()}; expires=${expires}; path=/`;

    return "success";
  }

  return null;
}

export function logOut() {
  document.cookie = `user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  window.location.reload();
}
