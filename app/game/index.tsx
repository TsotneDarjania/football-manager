"use client";

import { useSearchParams } from "next/navigation";
import style from "./style.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { tournamenrDataConfig } from "./config/tournamentDataConfig";
import { matchData } from "../config/matchData";
import { AppContext } from "../context/appContext";
import { useRouter } from "next/navigation";
import { gameConfig } from "./config/gameConfig";

let Preload: any;
let Menu: any;
let GamePlay: any;
let CanvasScene: any;

export const Game = () => {
  const appContext = useContext(AppContext);
  const router = useRouter();

  const audioRef = useRef(null);

  const [showGetUserInformation, setShowGetUserInformation] = useState(true);

  const searchParams = useSearchParams();

  if (searchParams.get("matchMode") === null) {
    matchData.matchIsFor = "Quiq Match";
  }

  if (searchParams.get("matchMode") === "league") {
    matchData.matchIsFor = "League";
    tournamenrDataConfig.hostTeam = searchParams.get("h")!;
    tournamenrDataConfig.guestTeam = searchParams.get("g")!;
    tournamenrDataConfig.week = parseInt(searchParams.get("week")!);
    tournamenrDataConfig.division = parseInt(searchParams.get("division")!);
  }

  if (searchParams.get("matchMode") === "cup") {
    matchData.matchIsFor = "Cup";
  }

  const canvasContainer = useRef<HTMLDivElement>(null);

  const [showGame, setShowGame] = useState(false);
  const [phaserGame, setPhaserGame] = useState<Phaser.Game | null>(null);

  useEffect(() => {
    if (!showGame || !canvasContainer.current) return;

    // Client-side-only code
    if (typeof window !== "undefined") {
      Preload = require("./scenes/preload").default;
      Menu = require("./scenes/menu").default;
      GamePlay = require("./scenes/gameplay").default;
      CanvasScene = require("./scenes/canvasScene").default;
    }

    import("phaser").then((Phaser) => {
      const game = new Phaser.Game({
        dom: { createContainer: true },
        physics: {
          default: "arcade",
          arcade: {
            debug: false,
          },
        },
        parent: canvasContainer.current!,
        fullscreenTarget: canvasContainer.current,
        type: Phaser.AUTO,
        scale: {
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: window.innerWidth,
          height: window.innerHeight,
        },
        backgroundColor: 0x08170f,
        scene: [Preload, Menu, GamePlay, CanvasScene],
      });
      setPhaserGame(game);

      return () => {
        game.destroy(true, true);
        setPhaserGame(null);
      };
    });
  }, [showGame]);

  useEffect(() => {
    if (!showGetUserInformation && !appContext.userData.isLogin) {
      router.push("/");
    }
  }, [showGetUserInformation]);

  const [deviceOrientation, setDeviceOrientation] = useState(() => {
    if (typeof window === "undefined") return;
    return window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  });

  const handleResize = () => {
    if (typeof window === "undefined") return;
    const orientation =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";
    setDeviceOrientation(orientation);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Call handleResize initially to set the correct state
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // if (
    //   Object.keys(gameConfig.menuTeams).length === 0 &&
    //   matchData.matchIsFor === "Quiq Match"
    // ) {
    //   router.push("/");
    // } else {
    //   if (deviceOrientation === "landscape") {
    //     setShowGame(true);
    //     const audioElement = document.getElementById("myAudio");
    //     if (audioElement) {
    //       //@ts-ignore
    //       audioElement.volume = 0.08;
    //     }
    //   } else {
    //     setShowGame(false);
    //   }
    // }

    setShowGame(true);
  }, [deviceOrientation]);

  useEffect(() => {
    return () => {
      if (phaserGame) {
        phaserGame.destroy(true, true);
        window.location.reload();
      }
    };
  }, [phaserGame]);

  return (
    <div>
      {/* Game Container */}
      {deviceOrientation === "portrait" && (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className=" text-black custom-font-2 text-center px-2 text-3xl">
            Please rotate your device
          </h1>
        </div>
      )}
      {showGame && (
        <div ref={canvasContainer} className={style.canvasContainer}></div>
      )}

      <audio
        id="myAudio"
        controls
        src={"/game/assets/sounds/song.mp3"}
        autoPlay
      />
    </div>
  );
};

export default Game;
