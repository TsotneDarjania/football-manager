"use client";

import TextAnimation from "@/app/components/tatukaComponents/textAnimation/TextAnimation";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import style from "./style.module.css";
import CtaButton from "@/app/components/buttons/ctaButton";
import { useContext } from "react";
import { AppContext } from "@/app/context/appContext";
import clsx from "clsx";
import { SimulatorComponent } from "./components/simulatorComponent";
import { GameCompoent } from "./components/game";
import { ForInvestorsComponent } from "./components/fotInvestorsComponent";

export function MenuContent() {
  const appContext = useContext(AppContext);

  return (
    <div
      className={clsx(
        "absolute duration-500 transition-all h-[90vh] w-screen left-0 bg-[#1e2b28] overflow-y-scroll",
        appContext.homePageMode === "default" ? "top-[-100vh]" : "top-[0vh]"
      )}
    >
      {/* Close Button */}
      {appContext.homePageMode !== "default" ? (
        <MdClose
          onClick={() => {
            appContext.setHomePageMode("default");
          }}
          className="fixed right-2 top-2 text-5xl text-white cursor-pointer z-10"
        />
      ) : null}

      {/* Text Animation */}
      <div className="absolute left-2 top-2">
        <TextAnimation
          customOptions={{
            symbolAnimationTime: 3,
            fontSize: 40,
            speed: 95,
            mirror: true,
            style: "loading",
            colors: ["#FFFFFF"],
          }}
          text={appContext.homePageMode}
        />
      </div>
      {/* Simulator Content */}
      {appContext.homePageMode === "simulator" && <SimulatorComponent />}
      {/* Game Component */}
      {appContext.homePageMode === "game" && <GameCompoent />}
      {/* For Investors */}
      {appContext.homePageMode === "investors" && <ForInvestorsComponent />}
    </div>
  );
}
