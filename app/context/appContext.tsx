"use client";

import React, { createContext, useState } from "react";
import { initialTeamsData } from "../config/initialTeamsData";

type AppContextProps = {
  homePageMode: "default" | "simulator" | "game" | "investors";
  setHomePageMode: React.Dispatch<
    React.SetStateAction<"default" | "simulator" | "game" | "investors">
  >;
  modalState: {
    type: "info" | "warning" | "authentication";
    isOpen: boolean;
    title: string;
    message: string;
  };
  setModalState: React.Dispatch<
    React.SetStateAction<{
      type: "info" | "warning" | "authentication";
      isOpen: boolean;
      title: string;
      message: string;
    }>
  >;
  isOpenUserProfile: boolean;
  setOpenUserProfile: React.Dispatch<React.SetStateAction<boolean>>;
  openLoadingModal: boolean;
  setOpenLodaingModal: React.Dispatch<React.SetStateAction<boolean>>;
  userData: {
    isLogin: boolean;
    username: string;
    email: string;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      isLogin: boolean;
      username: string;
      email: string;
    }>
  >;
  userTeams: typeof initialTeamsData;
  setUserTeams: React.Dispatch<React.SetStateAction<typeof initialTeamsData>>;
};

export const AppContext = createContext<AppContextProps>({
  homePageMode: "default",
  setHomePageMode: () => {},
  modalState: {
    type: "info",
    isOpen: false,
    title: "",
    message: "",
  },
  setModalState: () => {},
  isOpenUserProfile: false,
  setOpenUserProfile: () => {},
  openLoadingModal: false,
  setOpenLodaingModal: () => {},
  userData: {
    isLogin: false,
    username: "",
    email: "",
  },
  setUserData: () => {},
  userTeams: initialTeamsData,
  setUserTeams: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [homePageMode, setHomePageMode] = useState<
    "default" | "simulator" | "game" | "investors"
  >("default");

  const [openLoadingModal, setOpenLodaingModal] = useState(false);
  const [isOpenUserProfile, setOpenUserProfile] = useState(false);

  const [modalState, setModalState] = useState<{
    type: "info" | "warning" | "authentication";
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    type: "info",
    isOpen: false,
    title: "",
    message: "",
  });
  const [userData, setUserData] = useState({
    isLogin: false,
    username: "",
    email: "",
  });

  const [userTeams, setUserTeams] = useState(initialTeamsData);

  return (
    <AppContext.Provider
      value={{
        homePageMode,
        setHomePageMode,
        modalState,
        setModalState,
        isOpenUserProfile,
        setOpenUserProfile,
        openLoadingModal,
        setOpenLodaingModal,
        userData,
        setUserData,
        userTeams,
        setUserTeams,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
