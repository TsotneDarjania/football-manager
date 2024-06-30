import CtaButton from "@/app/components/buttons/ctaButton";
import { AppContext } from "@/app/context/appContext";
import { useContext } from "react";

export function LogOutContent() {
  const appContext = useContext(AppContext);

  return (
    <>
      <p className=" mt-4 custom-font-4">
        {" "}
        You are not logged in yet. If you want to play the game, you have to
        authorize first{" "}
      </p>

      <CtaButton
        className="custom-font-4 mt-4 text-2xl"
        onClick={() => {
          appContext.setModalState({
            type: "authentication",
            isOpen: true,
            title: "Authentication",
            message: "authentication",
          });
        }}
        label="Authorize"
      />
    </>
  );
}
