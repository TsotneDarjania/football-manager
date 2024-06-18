import TextAnimation from "@/app/components/tatukaComponents/textAnimation/TextAnimation";
import style from "./style.module.css";
import CtaButton from "@/app/components/buttons/ctaButton";
import { useContext } from "react";
import { AppContext } from "@/app/context/appContext";

export function UserProfileComponent() {
  const appContext = useContext(AppContext);
  return (
    <div className="fixed text-[#330a3f] left-0 top-0 w-screen h-[90vh]">
      <div className={style.profile}>
        <div className="flex w-full justify-center">
          <TextAnimation
            customOptions={{
              symbolAnimationTime: 3,
              fontSize: 40,
              speed: 95,
              mirror: true,
              style: "loading",
              colors: ["#330a3f"],
            }}
            text={"User Profile"}
          />
        </div>

        {/* Log Out Content */}
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
      </div>
    </div>
  );
}
