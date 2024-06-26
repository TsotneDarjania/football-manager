import { calculatePercentage, interpolate } from "@/app/utils/math";
import { Stadium } from "../stadium";
import { Column } from "./column";
import { Footballer } from "./footballer";
import { TeamData } from "@/app/config/initialTeamsData";
import { match } from "assert";
import { Ball } from "../ball";
import { matchData } from "@/app/config/matchData";
import { Match } from "../../core/match";

export class Team extends Phaser.GameObjects.Container {
  defenceColumn!: Column;
  midfielderColumn!: Column;
  attackerColumn!: Column;

  goalKeeper!: Footballer;
  goalKeeperTween!: Phaser.Tweens.Tween;
  columnsMotionDistance!: number;

  footballers: Array<Footballer> = [];

  hasBall = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public stadium: Stadium,
    public isHost: boolean,
    public teamData: TeamData,
    public ball: Ball,
    public match: Match
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addColumns();
    this.addGoalKeeper();
    this.calculateColumnsMotionDistance();

    this.setDepth(900);

    if (matchData.mathMode === "experimental") {
      this.TeamMotionManagement();
    }
  }

  reset() {
    this.defenceColumn.reset();
    this.midfielderColumn.reset();
    this.attackerColumn.reset();

    this.showFootballers();
  }

  resetGoalKeeper() {
    this.goalKeeper.setPosition(
      this.isHost
        ? -calculatePercentage(50, this.stadium.stadiumWidth)
        : calculatePercentage(50, this.stadium.stadiumWidth),
      0
    );
  }

  addGoalKeeper() {
    this.goalKeeper = new Footballer(
      this.scene,
      this.isHost
        ? -calculatePercentage(50, this.stadium.stadiumWidth)
        : calculatePercentage(50, this.stadium.stadiumWidth),
      0,
      this.teamData.name,
      "goalkeeper",
      this.isHost,
      this.stadium,
      this.teamData.techniqueProperties
    );
    this.add(this.goalKeeper);
    this.footballers.push(this.goalKeeper);
  }

  stopGoalKeeper() {
    this.goalKeeperTween.pause();
  }

  addColumns() {
    this.defenceColumn = new Column(
      this.scene,
      this.isHost
        ? -calculatePercentage(38, this.stadium.stadiumWidth)
        : calculatePercentage(38, this.stadium.stadiumWidth),
      0,
      Number(this.teamData.formation.split("-")[0]),
      this.stadium,
      this.teamData,
      this.isHost,
      "defender"
    );
    this.add(this.defenceColumn);
    this.footballers.push(...this.defenceColumn.footballers);

    this.midfielderColumn = new Column(
      this.scene,
      this.isHost
        ? -calculatePercentage(10, this.stadium.stadiumWidth)
        : calculatePercentage(10, this.stadium.stadiumWidth),
      0,
      Number(this.teamData.formation.split("-")[1]),
      this.stadium,
      this.teamData,
      this.isHost,
      "midfielder"
    );
    this.add(this.midfielderColumn);
    this.footballers.push(...this.midfielderColumn.footballers);

    this.attackerColumn = new Column(
      this.scene,
      this.isHost
        ? calculatePercentage(23, this.stadium.stadiumWidth)
        : -calculatePercentage(23, this.stadium.stadiumWidth),
      0,
      Number(this.teamData.formation.split("-")[2]),
      this.stadium,
      this.teamData,
      this.isHost,
      "attacker"
    );
    this.add(this.attackerColumn);
    this.footballers.push(...this.attackerColumn.footballers);
  }

  calculateColumnsMotionDistance() {
    let maxFootballerNumber = 0;
    let columnWidthMaxFootballer!: Column;

    [this.defenceColumn, this.midfielderColumn, this.attackerColumn].forEach(
      (column) => {
        if (column.footballers.length > maxFootballerNumber) {
          maxFootballerNumber = column.footballers.length;
          columnWidthMaxFootballer = column;
        }
      }
    );

    this.columnsMotionDistance = columnWidthMaxFootballer.motionDistance;
  }

  startMotion() {
    this.defenceColumn.startMotion(this.columnsMotionDistance);
    this.midfielderColumn.startMotion(this.columnsMotionDistance);
    this.attackerColumn.startMotion(this.columnsMotionDistance);
  }

  stopMotion() {
    this.defenceColumn.stopMotion();
    this.midfielderColumn.stopMotion();
    this.attackerColumn.stopMotion();
  }

  stopFaulBehaviour() {
    this.midfielderColumn.stopFaulBehaviour();
    this.defenceColumn.stopFaulBehaviour();
  }

  // For Experimental Mode
  TeamMotionManagement() {
    const thresholdDistance = calculatePercentage(
      13,
      this.stadium.getBounds().width
    ); // Example threshold distance

    this.scene.events.on("update", () => {
      if (this.match.isPlaying === false) return;

      if (!this.hasBall) {
        // for Defender Column
        if (
          Math.abs(
            this.ball.getBounds().centerX -
              this.defenceColumn.getBounds().centerX
          ) > thresholdDistance
        ) {
          this.defenceColumn.stopMotion();
        } else {
          this.defenceColumn.startMotion(this.columnsMotionDistance);
        }

        // for Midfielder Column
        if (
          Math.abs(
            this.ball.getBounds().centerX -
              this.midfielderColumn.getBounds().centerX
          ) > thresholdDistance
        ) {
          this.midfielderColumn.stopMotion();
        } else {
          this.midfielderColumn.startMotion(this.columnsMotionDistance);
        }

        // for Attacker Column
        if (
          Math.abs(
            this.ball.getBounds().centerX -
              this.attackerColumn.getBounds().centerX
          ) > thresholdDistance
        ) {
          this.attackerColumn.stopMotion();
        } else {
          this.attackerColumn.startMotion(this.columnsMotionDistance);
        }
      } else {
        this.defenceColumn.stopMotion();
        this.midfielderColumn.stopMotion();
        this.attackerColumn.stopMotion();
      }
    });
  }

  startGoalKeeperMotion() {
    if (this.goalKeeperTween) {
      this.goalKeeperTween.resume();
      return;
    }

    this.goalKeeperTween = this.scene.tweens.add({
      targets: this.goalKeeper,
      duration: interpolate(
        this.teamData.techniqueProperties.goalKeeperMotionSpeed,
        1200,
        300
      ),
      y: {
        from: -this.stadium.leftGoalPost.getBounds().height / 2,
        to: this.stadium.leftGoalPost.getBounds().height / 2,
      },
      repeat: -1,
      yoyo: true,
    });
  }

  hideFootballers() {
    this.footballers.forEach((footballer) => {
      footballer.setVisible(false);
    });
  }

  showFootballers() {
    this.footballers.forEach((footballer) => {
      footballer.setVisible(true);
    });
  }
}
