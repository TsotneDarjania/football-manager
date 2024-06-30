import TextAnimation from "@/app/components/tatukaComponents/textAnimation/TextAnimation";
import style from "./style.module.css";
import CtaButton from "@/app/components/buttons/ctaButton";
import { useContext } from "react";
import { AppContext } from "@/app/context/appContext";
import { LogOutContent } from "./components/logOutContent";
import { LogInContent } from "./components/logInContent";

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
            text={
              appContext.userData.isLogin
                ? appContext.userData.username
                : "User Profile"
            }
          />
        </div>

        {appContext.userData.isLogin ? <LogInContent /> : <LogOutContent />}
      </div>
    </div>
  );
}
