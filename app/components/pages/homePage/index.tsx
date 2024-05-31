"use client";

import { useContext, useState } from "react";
import Bound from "../../global/bound";
import WebIndicators from "../../global/webIndicators";
import { PageModal } from "../../modal/pageModal";
import { AppContext } from "@/app/context/appContext";
import AuthorizationModal from "../../modal/authorizationModal";
import GetUserInformation from "../../global/getUserInformation";

export default function HomePage() {
  const appContext = useContext(AppContext);

  const [showGetUserInformation, setShowGetUserInformation] = useState(true);

  return (
    <div className="w-screen h-screen">
      {showGetUserInformation && (
        <GetUserInformation
          callBack={() => {
            setShowGetUserInformation(false);
          }}
        />
      )}

      <Bound>
        <h1 className="text-[#4e4e4e] custom-font-2 font-bold text-3xl">
          Football Manager
        </h1>
        <h2 className="custom-font-2 w-[80vw] text-balance text-lg sm:text-sm sm:leading-5 mt-2">
          This platform is for those who love football and find joy in the game{" "}
          <br></br>
          <br></br>I started this project as a simple football match simulator,
          but now I am expanding it to not only be a simulator but also a game.
          It will be similar to Football Manager, where you can create or choose
          an existing team and strive to make it the best. You Will have the
          opportunity to participate in competitions not only against the
          computer but also against real people online. <br></br> <br></br>{" "}
          Additionally, this simulator has the potential to become an online
          casino game. It will YouTubers who want to record videos like this{" "}
          <span
            onClick={() => {
              window.open("https://www.youtube.com/watch?v=x5cI6hHuxnI");
            }}
            className=" text-[#323438] font-bold text-xl cursor-pointer"
          >
            Link
          </span>
          . One last thing: as a JavaScript developer, I am proud to announce
          that any developer with a passion for creating something different and
          truly fun is welcome to contribute to this project and improve it.
          Contributors are very welcome here. You can explore the{" "}
          <span
            onClick={() => {
              window.open("https://github.com/TsotneDarjania/football-manager");
            }}
            className=" text-[#323438] font-bold text-xl cursor-pointer"
          >
            Repository
          </span>{" "}
        </h2>
      </Bound>

      {appContext.openAutorizationModal && <AuthorizationModal />}
      <PageModal backgroundColor="#071414" />
      <WebIndicators />
    </div>
  );
}
