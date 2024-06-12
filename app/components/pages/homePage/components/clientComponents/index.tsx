"use client";

import { CgMenuGridR } from "react-icons/cg";
import { MenuButtons } from "./components/menuButtons";
import { Modal } from "./components/modal";
import AppProvider from "@/app/context/appContext";

export default function ClientComponents() {
  return (
    <div className="">
      <AppProvider>
        <MenuButtons />
        {/* Modal */}
        <Modal />
        {/* Indicators */}
        <div className="fixed bottom-0 left-0 w-screen h-[10vh] border-t-[8px] border-[#4f6b60]">
          <CgMenuGridR className="fixed right-1 bottom-1 text-5xl cursor-pointer text-[#4f6b60] " />
        </div>
      </AppProvider>
    </div>
  );
}
