import { calculatePercentage } from "@/app/utils/math";
import { clearInterval } from "timers";
import GamePlay from "./gameplay";

export default class MatchIndicators extends Phaser.Scene {
  scoreText!: Phaser.GameObjects.Text;

  hostScore = 0;
  guestScore = 0;

  timerText!: Phaser.GameObjects.Text;

  constructor() {
    super("MatchIndicators");
  }

  create() {
    this.scoreText = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(5, this.game.canvas.height),
        `${this.hostScore} - ${this.guestScore}`,
        {
          fontFamily: "Rubik Mono One",
          fontSize: 40,
          color: "#DAF2E9",
          align: "center",
        }
      )
      .setOrigin(0.5);

    // const hostTeamIcon = this.add.image(
    //   this.game.canvas.width / 2 -
    //     calculatePercentage(9, this.game.canvas.width),
    //   calculatePercentage(5, this.game.canvas.height),
    //   matchData.hostTeamData!.key
    // );

    // const guestTeam = this.add.image(
    //   this.game.canvas.width / 2 +
    //     calculatePercentage(9, this.game.canvas.width),
    //   calculatePercentage(5, this.game.canvas.height),
    //   matchData.guestTeamData!.key
    // );

    const menuIcon = this.add
      .image(
        calculatePercentage(2.5, this.game.canvas.width),
        calculatePercentage(5, this.game.canvas.height),
        "menuIcon"
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        const gamePlayScene = this.scene.get("GamePlay") as GamePlay;

        this.scene.stop();
        clearTimeout(gamePlayScene.match.interval);
        gamePlayScene.events.removeListener("update");
        gamePlayScene.scene.start("Menu");
      });

    this.timerText = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(10, this.game.canvas.height),
        "0",
        {
          fontFamily: "Rubik Mono One",
          fontSize: 35,
          color: "#DAF2E9",
          align: "center",
        }
      )
      .setOrigin(0.5);
  }

  setTimerText(time: number) {
    this.timerText.setText(`${time}`);
  }

  setScore(lefscore: number, rightScore: number) {
    this.scoreText.setText(`${lefscore} - ${rightScore}`);
  }
}
