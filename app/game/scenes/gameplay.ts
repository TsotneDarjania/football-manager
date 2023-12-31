import { CameraMotion } from "../core/cameraMotion";
import { CollisionDetections } from "../core/collisionDetections";
import { Match } from "../core/match";
import { teamsData } from "../data/teamsData";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";

export default class GamePlay extends Phaser.Scene {
  match!: Match;
  constructor() {
    super("GamePlay");
  }

  create() {
    this.addStadium();
  }

  addStadium() {
    const stadium = new Stadium(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      850,
      400,
      80,
      0xf82116,
      0x02dc0d
    );

    const ball = new Ball(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      stadium
    );

    const cameraMotion = new CameraMotion(this, stadium, ball);

    this.events.on("cameraStartAnimationEnd", () => {
      this.match.openStartText();
    });

    const hostTeamData = teamsData.premierLeague.teams[5];

    const guestTeamData = teamsData.premierLeague.teams[6];

    this.match = new Match(
      this,
      {
        stadium: stadium,
        hostTeamData: hostTeamData,
        guestTeamData: guestTeamData,
      },
      cameraMotion,
      ball
    );
  }
}
