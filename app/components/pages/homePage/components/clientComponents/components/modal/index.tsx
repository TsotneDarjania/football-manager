"use client";

import TextAnimation from "@/app/components/tatukaComponents/textAnimation/TextAnimation";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import style from "./style.module.css";
import CtaButton from "@/app/components/buttons/ctaButton";
import { useContext, useEffect } from "react";
import { AppContext } from "@/app/context/appContext";
import clsx from "clsx";

export function Modal() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    // alert(appContext.menuIsOpen);
  }, [appContext.menuIsOpen]);

  return (
    <div
      className={clsx(
        "absolute duration-700 transition-all h-[90vh] w-screen left-0 bg-[#1e2b28] overflow-y-scroll",
        appContext.menuIsOpen ? "top-[0vh]" : "top-[-100vh]"
      )}
    >
      {/* Close Button */}
      {appContext.menuIsOpen ? (
        <MdClose
          onClick={() => {
            appContext.setMenuIsOpen(false);
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
          text="Simulator"
        />
      </div>
      {/* Other Content */}
      <div className="w-[50vw] absolute right-0 top-[0px]">
        <CtaButton
          className="custom-font-4 ml-[21vw] mt-[12vh] text-2xl"
          onClick={() => {}}
          label="Open Simulator"
        />
        {/* Image 1 */}
        <div
          className={
            "w-[36vw] min-h-[260px] grayscale-[100%] relative ml-[10vw] mt-[63vh] " +
            style.shadow
          }
        >
          <Image
            fill
            src="/website/images/pageAssets/image-3.png"
            sizes="100vw"
            alt="youtube-icon"
          />
        </div>

        {/* Image 2 */}
        <div
          className={
            "w-[36vw] min-h-[260px] grayscale-[100%] relative ml-[10vw] mt-[48vh] " +
            style.shadow
          }
        >
          <Image
            fill
            src="/website/images/pageAssets/image-4.png"
            sizes="100vw"
            alt="youtube-icon"
          />
        </div>
      </div>

      {/* Text */}
      <div className="ml-2 text-xl w-[50vw] mt-[80px] text-[#68c0bc] custom-font-4">
        <p>
          As the title says, it is a simulator. More specifically, it is a
          simulator for football matches. Once authorized, you can choose your
          desired teams, set parameters, and then watch the match unfold.
          <br></br>
          <br></br>
          also you can set a lot of options like, with extra times or not, how
          many shopuld be match time, define modes like experimental and classic
          and so on..
          <br></br>
          <br></br>
          trust my experience, if you like footbbal (no soccer), it is realy
          interesting and funny for watch.
        </p>
        <h2 className="text-[#cdf7f4] custom-font-4 font-bold text-2xl mt-[50px] underline">
          Teams
        </h2>
        <p>
          as e default you have 10 teams, which you can choose for match, but
          also you have possibilities to add new team, set what you want to be
          logo, name, parameteres and custtomize how you want.
          <br></br>
          <br></br>
          what you can set as a parameters
          <br></br>
          <br></br>
        </p>
        <p>
          This is the main concept that makes the simulator more interesting.
          You can set parameters such as:
          <span className="flex justify-center text-start">
            <br></br>
            1.Pass speed
            <br></br>
            2.Pass accuracy
            <br></br>
            3.Shoot speed
            <br></br>
            4.Shoot accuracy
            <br></br>
            5.Players motion speed
            <br></br>
            6.Goalkeepers motion speed
            <br></br>
            7.Pass delay
            <br></br>
            8.Formation of footballers
            <br></br>
          </span>
          <br></br>
          Additionally, you can set only the strength parameter, and all other
          parameters will be calculated automatically according to strength.
        </p>
        <h2 className="text-[#cdf7f4] custom-font-4 font-bold text-2xl mt-[50px] underline">
          A Short History and Future Prospects
        </h2>
        <p>
          It was initially envisioned as a one-time project solely for recording
          videos, not as a full-fledged game or anything of the sort. After the
          first demo version was ready, the idea emerged that it had the
          potential to become a manager game. In this game, your mission would
          be to manage your team and make it the best in the world, with the
          main emphasis not on visuals but on strategy and tactics. However, the
          simulator aspect also proved to be quite intriguing. It became a
          realistic simulator where you could try to predict real match scores
          based on FIFA team ratings.
          <br></br>
          <br></br>
          soon I will be adding more features, shaping it to be more suitable
          for content creators on social media platforms
          <br></br>
          <br></br>
          thanks for reading, and please stay tuned for more updates!
          <br></br>
          <br></br>
        </p>
      </div>
    </div>
  );
}
