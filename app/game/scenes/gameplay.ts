import { CameraMotion } from "../core/cameraMotion";
import { Match } from "../core/match";
import { Ball } from "../gameObjects/ball";
import { Stadium } from "../gameObjects/stadium";

export default class GamePlay extends Phaser.Scene {
  match!: Match;
  stadium!: Stadium;
  constructor() {
    super("GamePlay");
  }

  create() {
    this.stadium = new Stadium(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      850,
      400,
      50,
      0xfef9ed,
      0xff1606
    );

    const ball = new Ball(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      this.stadium
    );

    const cameraMotion = new CameraMotion(this, this.stadium, ball);

    this.events.on("cameraStartAnimationEnd", () => {
      // this.match.openStartText();
    });

    this.addCityBackground();

    // matchData.stadium = stadium;

    // this.match = new Match(this, matchData, cameraMotion, ball);
  }

  addCityBackground() {
    const image = this.add
      .image(this.game.canvas.width / 2, this.game.canvas.height / 2, "city")
      .setScale(2)
      .setTint(0x467572)
      .setDepth(-100);

    this.add
      .image(this.game.canvas.width / 2, this.game.canvas.height / 2, "default")
      .setDisplaySize(1400, 790)
      .setTint(0x467572)
      .setDepth(-90);
  }
}
