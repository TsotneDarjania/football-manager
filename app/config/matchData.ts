import { TeamData, initialTeamsData } from "./initialTeamsData";

export const matchData: MatchData = {
  hostTeam: initialTeamsData.Arsenal,
  guestTeam: initialTeamsData.Arsenal,
  matchTime: 2,
  mathMode: "classic",
  stadiumSize: "small",
};

export type MatchData = {
  hostTeam: TeamData;
  guestTeam: TeamData;
  matchTime: number;
  mathMode: "classic" | "experimental";
  stadiumSize: "small" | "normal" | "big" | "Mega";
};
