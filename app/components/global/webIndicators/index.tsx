"use client";

import Image from "next/image";
import Hamburger from "hamburger-react";
import style from "./style.module.css";
import React, { useContext, useState } from "react";
import { AppContext } from "@/app/context/appContext";
import clsx from "clsx";

export default function WebIndicators() {
  const appContext = useContext(AppContext);

  return (
    <div className="fixed left-0 bottom-0 w-[10%] h-14 flex items-end justify-between">
      {/* Background */}
      {/* <div className=" absolute bg-slate-950 opacity-90 w-full h-full"></div> */}

      {/* Menu Button */}
      {appContext.selectedMenuItem === "" ? (
        <div
          className={clsx(
            "border-4 rounded-lg ml-1 mb-1 border-gray-300 w-fit fixed",
            appContext.menuIsOpen ? " bg-black" : "bg-white"
          )}
        >
          <Hamburger
            color={appContext.menuIsOpen ? "#ffffff" : "#000000"}
            direction="right"
            toggled={appContext.menuIsOpen}
            toggle={appContext.setMenuIsOpen}
          />
        </div>
      ) : (
        <Image
          onClick={() => {
            appContext.setSelectedMenuItem("");
          }}
          className="cursor-pointer absolute -left-1 sm:-left-2 bottom-2 sm:-bottom-1 sm:scale-[0.7]"
          src="/website/images/ui/back-button.png"
          width={60}
          height={60}
          alt="back-button"
        />
      )}
    </div>
  );
}
