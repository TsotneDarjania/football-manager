"use client";

import { CgMenuGridR } from "react-icons/cg";
import { MenuButtons } from "./components/menuButtons";
import { AppContext } from "@/app/context/appContext";
import { MenuContent } from "./components/menuContent";
import { BsInfoSquare } from "react-icons/bs";
import { HiMiniPlay } from "react-icons/hi2";
import { useContext, useEffect } from "react";
import { PopUpModal } from "@/app/components/global/modals/popUpModal";
import { UserProfileComponent } from "./components/userProfile";
import { FaWindowClose } from "react-icons/fa";
import LoadingModal from "@/app/components/global/modals/loadingModal";
import { getUserData } from "@/app/core/user";

export default function ClientComponents() {
  const appContext = useContext(AppContext);

  useEffect(() => {
    const userData = getUserData();
    if (userData !== null) {
      appContext.setUserData(userData);
    }
  }, []);

  return (
    <div className="">
      {appContext.openLoadingModal && <LoadingModal />}
      <MenuButtons />
      {/* MenuContent */}
      <MenuContent />
      {/* Indicators */}
      <div className="fixed bottom-0 left-0 justify-between px-2 flex items-center w-screen h-[10vh] border-t-[2px] border-[#4f6b60]">
        <HiMiniPlay
          onClick={() => {
            window.location.href = "/game";
          }}
          className="text-5xl cursor-pointer text-[#4f6b60] "
        />
        {appContext.isOpenUserProfile ? (
          <FaWindowClose
            onClick={() => {
              appContext.setOpenUserProfile(false);
            }}
            className="text-5xl cursor-pointer text-[#4f6b60]"
          />
        ) : (
          <CgMenuGridR
            onClick={() => {
              appContext.setOpenUserProfile(true);
            }}
            className="text-5xl cursor-pointer text-[#4f6b60]"
          />
        )}

        <BsInfoSquare
          onClick={() => {
            appContext.setModalState({
              type: "info",
              isOpen: true,
              title: "About Project",
              message: "about",
            });
          }}
          className="text-4xl cursor-pointer text-[#4f6b60]"
        />
      </div>
      {/* User Profile */}
      {appContext.isOpenUserProfile && <UserProfileComponent />}
      {/* About Us Modal */}
      {appContext.modalState.isOpen && <PopUpModal />}
    </div>
  );
}
