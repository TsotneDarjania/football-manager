import { AppContext } from "@/app/context/appContext";
import { logOut } from "@/app/core/authenticate";
import { useContext } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";

export function LogInContent() {
  const appContext = useContext(AppContext);

  return (
    <>
      <RiLogoutBoxLine
        onClick={() => {
          logOut();
        }}
        className="absolute right-2 top-2 text-3xl cursor-pointer"
      />
    </>
  );
}
