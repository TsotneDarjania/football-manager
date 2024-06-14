"use client";

import { CgMenuGridR } from "react-icons/cg";
import { MenuButtons } from "./components/menuButtons";
import AppProvider from "@/app/context/appContext";
import { MenuContent } from "./components/menuContent";

export default function ClientComponents() {
  return (
    <div className="">
      <AppProvider>
        <MenuButtons />
        {/* MenuContent */}
        <MenuContent />
        {/* Indicators */}
        <div className="fixed bottom-0 left-0 justify-center flex sm:block w-screen h-[10vh] sm:border-t-[8px] border-[#4f6b60]">
          <CgMenuGridR className="sm:fixed right-1 bottom-1  text-5xl cursor-pointer text-[#4f6b60] " />
        </div>
      </AppProvider>
    </div>
  );
}
