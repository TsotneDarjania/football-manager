import { calculatePercentage } from "@/app/utils/math";
import GamePlay from "./gameplay";
import { matchData, matchStatsProps } from "@/app/config/matchData";
import { tournamenrDataConfig } from "../config/tournamentDataConfig";
// import { tournamentManager } from "@/app/core/tournamentsManager/tournametsManager";
import { MatchStatsModal } from "../ui/components/matchStatsModal";

export default class CavnasScene extends Phaser.Scene {
  scoreText!: Phaser.GameObjects.Text;

  // Match Modal Variables
  matchStatsModal!: MatchStatsModal;

  startButton!: Phaser.GameObjects.Image;

  topIndicators!: Phaser.GameObjects.Container;
  startModal!: Phaser.GameObjects.Container;

  hostScore = 0;
  guestScore = 0;

  timerText!: Phaser.GameObjects.Text;
  timer = 0;

  timerIsOnn = false;

  hostTeamPelantieIcons: Array<Phaser.GameObjects.Image> = [];
  guestTeamPelantieIcons: Array<Phaser.GameObjects.Image> = [];

  constructor() {
    super("CanvasScene");
  }

  create() {
    this.topIndicators = this.add.container(0, 0).setVisible(false);

    this.addTopIndicators();
    // this.addMenuButton();
    this.addStartModal();
  }

  addPenaltiesSign(team: "host" | "guest", status: "done" | "wrong") {
    if (team === "host") {
      const posX =
        50 +
        calculatePercentage(4, this.game.canvas.width) *
          this.hostTeamPelantieIcons.length;

      const icon = this.add
        .image(posX, 50, status === "done" ? "done-icon" : "wrong-icon")
        .setDisplaySize(50, 50);

      this.hostTeamPelantieIcons.push(icon);
    } else {
      const posX =
        this.game.canvas.width -
        50 -
        calculatePercentage(4, this.game.canvas.width) *
          this.guestTeamPelantieIcons.length;

      const icon = this.add
        .image(posX, 50, status === "done" ? "done-icon" : "wrong-icon")
        .setDisplaySize(50, 50);

      this.guestTeamPelantieIcons.push(icon);
    }
  }

  async addStartModal() {
    // await tournamentManager.init();
    // let division = undefined;
    // switch (tournamenrDataConfig.division) {
    //   case 1:
    //     division = tournamentManager.division_1;
    //     break;
    //   case 2:
    //     division = tournamentManager.division_2;
    //     break;
    //   case 3:
    //     division = tournamentManager.division_3;
    //     break;
    //   default:
    //     break;
    // }

    this.startModal = this.add.container(
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    );

    const background = this.add
      .image(0, 0, "default")
      .setTint(0x0e383b)
      .setAlpha(0.7)
      .setOrigin(0.5)
      .setDisplaySize(
        calculatePercentage(60, this.game.canvas.width),
        calculatePercentage(35, this.game.canvas.height)
      );
    this.startModal.add(background);

    const hostTeamName = this.add
      .text(
        -calculatePercentage(48, this.startModal.getBounds().width),
        0,
        matchData.hostTeam.name,
        {
          fontFamily: "Silkscreen",
          fontSize: calculatePercentage(2, this.game.canvas.width),
          color: "#DAF2E9",
          align: "right",
        }
      )
      .setOrigin(0, 0.5);
    this.startModal.add(hostTeamName);

    const hostTeamIcon = this.add
      .image(
        -calculatePercentage(48, this.startModal.getBounds().width),
        -calculatePercentage(30, this.startModal.getBounds().height),
        matchData.hostTeam.name
      )
      .setDisplaySize(
        calculatePercentage(8, this.startModal.getBounds().width),
        calculatePercentage(8, this.startModal.getBounds().width)
      )
      .setOrigin(0, 0.5);
    this.startModal.add(hostTeamIcon);

    // division?.findIndex((team, index) => {
    //   if (team.team_name === matchData.hostTeam.name) {
    //     const hostTeamPositionText = this.add
    //       .text(
    //         hostTeamName.x,
    //         calculatePercentage(10, this.startModal.getBounds().height),
    //         `${index + 1}th`,
    //         {
    //           fontFamily: "Silkscreen",
    //           fontSize: calculatePercentage(1.5, this.game.canvas.width),
    //           color: "#EB5344",
    //           align: "right",
    //         }
    //       )
    //       .setOrigin(0, 0);
    //     this.startModal.add(hostTeamPositionText);
    //   }
    // });

    const guestTeamName = this.add
      .text(
        calculatePercentage(48, this.startModal.getBounds().width),
        0,
        matchData.guestTeam.name,
        {
          fontFamily: "Silkscreen",
          fontSize: calculatePercentage(2, this.game.canvas.width),
          color: "#DAF2E9",
          align: "left",
        }
      )
      .setOrigin(1, 0.5);
    this.startModal.add(guestTeamName);

    const guestTeamIcon = this.add
      .image(
        calculatePercentage(48, this.startModal.getBounds().width),
        calculatePercentage(30, this.startModal.getBounds().height),
        matchData.guestTeam.name
      )
      .setDisplaySize(
        calculatePercentage(8, this.startModal.getBounds().width),
        calculatePercentage(8, this.startModal.getBounds().width)
      )
      .setOrigin(1, 0.5);
    this.startModal.add(guestTeamIcon);

    // division?.findIndex((team, index) => {
    //   if (team.team_name === matchData.guestTeam.name) {
    //     const guestTeamPositionText = this.add
    //       .text(
    //         guestTeamName.x,
    //         calculatePercentage(10, this.startModal.getBounds().height),
    //         `${index + 1}th`,
    //         {
    //           fontFamily: "Silkscreen",
    //           fontSize: calculatePercentage(1.5, this.game.canvas.width),
    //           color: "#EB5344",
    //           align: "left",
    //         }
    //       )
    //       .setOrigin(1, 0);
    //     this.startModal.add(guestTeamPositionText);
    //   }
    // });

    const vsText = this.add
      .text(0, 0, "VS", {
        fontFamily: "Silkscreen",
        fontSize: calculatePercentage(2.5, this.game.canvas.width),
        color: "#FF7131",
        align: "center",
      })
      .setOrigin(0.5);
    this.startModal.add(vsText);

    this.tweens.add({
      targets: vsText,
      alpha: 0,
      duration: 700,
      yoyo: true,
      repeat: -1,
    });

    this.startButton = this.add
      .image(
        0,
        calculatePercentage(50, this.startModal.getBounds().height),
        "start-button"
      )
      .setDisplaySize(
        calculatePercentage(8, this.startModal.getBounds().width),
        calculatePercentage(8, this.startModal.getBounds().width)
      )
      .setOrigin(0.5)
      .setVisible(false)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.startButton.setDisplaySize(
          calculatePercentage(9, this.startModal.getBounds().width),
          calculatePercentage(9, this.startModal.getBounds().width)
        );
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.startButton.setDisplaySize(
          calculatePercentage(8, this.startModal.getBounds().width),
          calculatePercentage(8, this.startModal.getBounds().width)
        );
      });

    this.startModal.add(this.startButton);

    // const weekText = this.add
    //   .text(
    //     0,
    //     -calculatePercentage(32, this.startModal.getBounds().height),
    //     `Week ${tournamenrDataConfig.week}`,
    //     {
    //       fontFamily: "Silkscreen",
    //       fontSize: calculatePercentage(3, this.game.canvas.width),
    //       color: "#DAF2E9",
    //       align: "center",
    //     }
    //   )
    //   .setOrigin(0.5);
    // this.startModal.add(weekText);
  }

  openMatchStatsModal(
    { hostTeamStats, guesTeamStats }: matchStatsProps,
    finishMatch: boolean
  ) {
    this.matchStatsModal = new MatchStatsModal(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2,
      finishMatch,
      {
        title: "Statistics",
        hostTeamStats: {
          shoots: hostTeamStats.shoots,
          passes: hostTeamStats.passes,
          ballPossession: hostTeamStats.ballPossession,
          corners: hostTeamStats.corners,
          fouls: hostTeamStats.fouls,
          score: hostTeamStats.score,
        },
        guesTeamStats: {
          shoots: guesTeamStats.shoots,
          passes: guesTeamStats.passes,
          ballPossession: guesTeamStats.ballPossession,
          corners: guesTeamStats.corners,
          fouls: guesTeamStats.fouls,
          score: guesTeamStats.score,
        },
      }
    );
  }

  addMenuButton() {
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
  }

  addTopIndicators() {
    this.scoreText = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(5, this.game.canvas.height),
        `${this.hostScore} - ${this.guestScore}`,
        {
          fontFamily: "Silkscreen",
          fontSize: calculatePercentage(3, this.game.canvas.width),
          color: "#DAF2E9",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.topIndicators.add(this.scoreText);

    const hostTeamIcon = this.add
      .image(
        this.game.canvas.width / 2 -
          calculatePercentage(9, this.game.canvas.width),
        calculatePercentage(5, this.game.canvas.height),
        matchData.hostTeam.name
      )
      .setDisplaySize(
        calculatePercentage(2.5, this.game.canvas.width),
        calculatePercentage(2.5, this.game.canvas.width)
      );
    this.topIndicators.add(hostTeamIcon);

    // const circle = this.add
    //   .graphics()
    //   .setPosition(
    //     hostTeamIcon.getBounds().centerX,
    //     hostTeamIcon.getBounds().centerY
    //   )
    //   .fillCircle(0, 0, 13);
    // hostTeamIcon.setMask(circle.createGeometryMask());

    const guestTeamIcon = this.add
      .image(
        this.game.canvas.width / 2 +
          calculatePercentage(9, this.game.canvas.width),
        calculatePercentage(5, this.game.canvas.height),
        matchData.guestTeam.name
      )
      .setDisplaySize(
        calculatePercentage(2.5, this.game.canvas.width),
        calculatePercentage(2.5, this.game.canvas.width)
      );
    this.topIndicators.add(guestTeamIcon);

    this.timerText = this.add
      .text(
        this.game.canvas.width / 2,
        calculatePercentage(10, this.game.canvas.height),
        "0",
        {
          fontFamily: "Silkscreen",
          fontSize: calculatePercentage(2.4, this.game.canvas.width),
          color: "#DAF2E9",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.topIndicators.add(this.timerText);


    const background = this.add
      .image(this.game.canvas.width / 2, 0, "default")
      .setTint(0x000000)
      .setOrigin(0.5, 0)
      .setAlpha(0.5)
      .setDisplaySize(
        calculatePercentage(120, this.topIndicators.getBounds().width),
        calculatePercentage(120, this.topIndicators.getBounds().height)
      );
    this.topIndicators.add(background);

    this.topIndicators.moveDown(background);
    this.topIndicators.moveDown(background);
    this.topIndicators.moveDown(background);
    this.topIndicators.moveDown(background);
  }

  setTimerText(time: number) {
    this.timerText.setText(`${time}`);
  }

  setScore(lefscore: number, rightScore: number) {
    this.scoreText.setText(`${lefscore} - ${rightScore}`);
  }

  showMatchActionTransition(topWord: string, bottomWord: string) {
    const container = this.add.container(0, 0);

    const background = this.add
      .image(0, 0, "default")
      .setTint(0x000000)
      .setAlpha(0)
      .setOrigin(0)
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    container.add(background);

    const topText = this.add
      .text(-2000, this.game.canvas.height / 2 - 40, topWord, {
        fontFamily: "Silkscreen",
        fontSize: 40,
        color: "#DAF2E9",
        align: "center",
        backgroundColor: "#FF7131",
      })
      .setOrigin(0.5)
      .setAlpha(0);
    container.add(topText);

    const bottomText = this.add
      .text(2000, this.game.canvas.height / 2 + 40, bottomWord, {
        fontFamily: "Silkscreen",
        fontSize: 40,
        color: "#DAF2E9",
        align: "center",
        backgroundColor: "#FF7131",
      })
      .setOrigin(0.5)
      .setAlpha(0);
    container.add(bottomText);

    this.tweens.add({
      targets: topText,
      ease: Phaser.Math.Easing.Bounce.Out,
      alpha: 1,
      x: this.game.canvas.width / 2,
      duration: 1500,
    });

    this.tweens.add({
      targets: bottomText,
      ease: Phaser.Math.Easing.Bounce.Out,
      alpha: 1,
      x: this.game.canvas.width / 2,
      duration: 1500,
      onComplete: () => {
        setTimeout(() => {
          container.destroy();
        }, 1700);
      },
    });

    this.tweens.add({
      targets: background,
      alpha: 0.9,
      duration: 300,
    });
  }
}
