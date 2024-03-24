import Menu from "@/app/game/scenes/menu";
import MenuModal from "..";
import { calculatePercentage } from "@/app/utils/math";
import { TeamData } from "@/app/config/initialTeamsData";
import { TacticsWindow } from "./tacticsWindow";

export class TacticsModal extends MenuModal {
  hostTeam!: TeamData;
  guestTeam!: TeamData;

  hostTeamTacticsWindow!: TacticsWindow;
  guestTeamTacticsWindow!: TacticsWindow;

  constructor(scene: Menu, x: number, y: number) {
    super(scene, x, y);
    this.initialization();
  }

  initialization() {
    this.addTacticsWindows();
    this.addCenterLine();
  }

  addTacticsWindows() {
    this.hostTeamTacticsWindow = new TacticsWindow(this.scene, 0, 0, "left");
    this.add(this.hostTeamTacticsWindow);

    this.guestTeamTacticsWindow = new TacticsWindow(this.scene, 0, 0, "right");
    this.add(this.guestTeamTacticsWindow);
  }

  setTeams(hostTeam: TeamData, guestTeam: TeamData) {
    this.hostTeam = hostTeam;
    this.guestTeam = guestTeam;

    this.hostTeamTacticsWindow.team = hostTeam;
    this.guestTeamTacticsWindow.team = guestTeam;

    this.addTeamLogos(hostTeam.logoKey, guestTeam.logoKey);
  }

  addTeamLogos(hostTeamLogoKey: string, guestTeamLogoKey: string) {
    const hostTeamLogo = this.scene.add
      .image(
        calculatePercentage(-47, this.scene.game.canvas.width),
        calculatePercentage(-43, this.scene.game.canvas.height),
        hostTeamLogoKey
      )
      .setDisplaySize(
        calculatePercentage(4, this.scene.game.canvas.width),
        calculatePercentage(4, this.scene.game.canvas.width)
      );
    this.add(hostTeamLogo);

    const guestTeamLogo = this.scene.add
      .image(
        calculatePercentage(47, this.scene.game.canvas.width),
        calculatePercentage(43, this.scene.game.canvas.height),
        guestTeamLogoKey
      )
      .setDisplaySize(
        calculatePercentage(4, this.scene.game.canvas.width),
        calculatePercentage(4, this.scene.game.canvas.width)
      );
    this.add(guestTeamLogo);
  }

  addCenterLine() {
    const centerLine = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        2,
        calculatePercentage(80, this.scene.game.canvas.height)
      );

    this.add(centerLine);
  }
}
