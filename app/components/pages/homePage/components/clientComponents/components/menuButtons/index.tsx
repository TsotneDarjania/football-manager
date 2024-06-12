"use client";

import { useContext } from "react";
import style from "./style.module.css";
import { AppContext } from "@/app/context/appContext";

export function MenuButtons() {
  const appContext = useContext(AppContext);

  return (
    <div className="absolute left-2 top-2 flex flex-col gap-5">
      <button
        onClick={() => {
          appContext.setMenuIsOpen(true);
        }}
        className={
          style.button_1 +
          " absolute left-[-20vw] cursor-pointer px-2 py-1 text-[#66ad5f] custom-font-4  border-[#79aa7c] border-b-[4px] hover:border-[#836607] hover:text-[#ca9534]  transition-all duration-200 text-2xl"
        }
      >
        Simulator
      </button>
      <button
        className={
          style.button_2 +
          " absolute left-[-20vw] mt-[50px] cursor-pointer px-2 py-1 text-[#66ad5f] custom-font-4  border-[#79aa7c] border-b-[4px] hover:border-[#836607] hover:text-[#ca9534]  transition-all duration-200 text-2xl"
        }
      >
        Game
      </button>
      <button
        className={
          style.button_3 +
          " absolute left-[-20vw] mt-[100px] w-max cursor-pointer px-2 py-1 text-[#66ad5f] custom-font-4  border-[#79aa7c] border-b-[4px] hover:border-[#836607] hover:text-[#ca9534]  transition-all duration-200 text-2xl"
        }
      >
        For Investors
      </button>
    </div>
  );
}
