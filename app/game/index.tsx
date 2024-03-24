"use client";

import { useSearchParams } from "next/navigation";
import style from "./style.module.css";
import { useEffect, useRef } from "react";
import { initialGameConfig } from "./config/gameInitialConfig";

let Preload: any;
let Menu: any;
let GamePlay: any;
let MatchIndicators: any;

export const Game = () => {
  const searchParams = useSearchParams();

  initialGameConfig.hostTeam = searchParams.get("h")!;
  initialGameConfig.guestTeam = searchParams.get("g")!;
  initialGameConfig.guestTeam = searchParams.get("g")!;
  initialGameConfig.week = parseInt(searchParams.get("week")!);
  initialGameConfig.division = parseInt(searchParams.get("division")!);

  const canvasContainer = useRef(null);

  useEffect(() => {
    if (!canvasContainer.current) return;

    // Client-side-only code
    if (typeof window !== "undefined") {
      Preload = require("./scenes/preload").default;
      Menu = require("./scenes/menu").default;
      GamePlay = require("./scenes/gameplay").default;
      MatchIndicators = require("./scenes/matchIndicators").default;
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
        scene: [Preload, Menu, GamePlay, MatchIndicators],
      });
      // return () => game?.destroy(true, false);
    });
  }, []);

  return <div ref={canvasContainer} className={style.canvasContainer}></div>;
};

export default Game;
