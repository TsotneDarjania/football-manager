import { Stadium } from "../gameObjects/stadium";
import { Team } from "../gameObjects/team/team";

export type MatchData = {
  matchData: import("c:/Users/User/Desktop/MyProjects/football-manager/app/config/initialTeamsData").TeamData;
  stadium: Stadium | null;
  hostTeamData: TeamData;
  guestTeamData: TeamData;
};

export type TeamData = {
  name: string;
  key: string;
  properties: TeamProperties;
  stength: number;
  tactics: {
    defence: {
      type: string;
      side: string;
      quntity: number;
    };
    midfielder: {
      type: string;
      side: string;
      quntity: number;
    };
    attacker: {
      type: string;
      side: string;
      quntity: number;
    };
  };
};

export type TeamProperties = {
  speed: number;
  goalkeeperSpeed: number;
  passDelay: number;
  passingStyle: string;
  passAccuracy: number;
  passSpeed: number;
  shootSpeed: number;
};
