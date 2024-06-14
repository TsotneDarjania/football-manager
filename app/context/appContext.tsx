"use client";

import React, { createContext, useState } from "react";
import { initialTeamsData } from "../config/initialTeamsData";

type AppContextProps = {
  homePageMode: "default" | "simulator" | "game" | "investors";
  setHomePageMode: React.Dispatch<
    React.SetStateAction<"default" | "simulator" | "game" | "investors">
  >;
  selectedMenuItem: string;
  setSelectedMenuItem: React.Dispatch<React.SetStateAction<string>>;
  openAutorizationModal: boolean;
  setOpenAutorizationModal: React.Dispatch<React.SetStateAction<boolean>>;
  userData: {
    isLogin: boolean;
    username: string;
  };
  setUserData: React.Dispatch<
    React.SetStateAction<{
      isLogin: boolean;
      username: string;
    }>
  >;
  userTeams: typeof initialTeamsData;
  setUserTeams: React.Dispatch<React.SetStateAction<typeof initialTeamsData>>;
};

export const AppContext = createContext<AppContextProps>({
  homePageMode: "default",
  setHomePageMode: () => {},
  selectedMenuItem: "",
  setSelectedMenuItem: () => {},
  openAutorizationModal: false,
  setOpenAutorizationModal: () => {},
  userData: {
    isLogin: false,
    username: "",
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

  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [openAutorizationModal, setOpenAutorizationModal] = useState(false);
  const [userData, setUserData] = useState({
    isLogin: false,
    username: "",
  });
  const [userTeams, setUserTeams] = useState(initialTeamsData);

  return (
    <AppContext.Provider
      value={{
        homePageMode,
        setHomePageMode,
        selectedMenuItem,
        setSelectedMenuItem,
        openAutorizationModal,
        setOpenAutorizationModal,
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
