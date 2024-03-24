import { calculatePercentage } from "@/app/utils/math";
import { Stadium } from "./stadium";

export class GoalPost extends Phaser.GameObjects.Container {
  goalLine!: Phaser.GameObjects.Image;
  colliders: Array<Phaser.Physics.Arcade.Image> = [];

  constructor(
    scene: Phaser.Scene,
    public side: string,
    public stadium: Stadium
  ) {
    super(scene);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addLines();
    this.side === "left" ? this.addLeftGoalLine() : this.addRightGoalLine();
  }

  addLines() {
    // Temporary solution
    let extraX = this.side === "left" ? 1 : 0;

    const topLineXPosition =
      this.side === "left"
        ? -this.stadium.stadiumWidth / 2 -
          calculatePercentage(12, this.stadium.stadiumHeight)
        : this.stadium.stadiumWidth / 2 - this.stadium.lineWidth;

    const topLine = this.scene.physics.add
      .image(
        topLineXPosition,
        -calculatePercentage(15, this.stadium.stadiumHeight),
        "default"
      )
      .setDisplaySize(
        calculatePercentage(13, this.stadium.stadiumHeight) - extraX,
        3
      )
      .setImmovable(true)
      .setOrigin(0);
    this.colliders.push(topLine);
    this.add(topLine);

    const bottomLineXPosition =
      this.side === "left"
        ? -this.stadium.stadiumWidth / 2 -
          calculatePercentage(12, this.stadium.stadiumHeight)
        : this.stadium.stadiumWidth / 2;

    const bottomLine = this.scene.physics.add
      .image(
        bottomLineXPosition,
        calculatePercentage(15, this.stadium.stadiumHeight),
        "default"
      )
      .setDisplaySize(
        calculatePercentage(13, this.stadium.stadiumHeight) - extraX,
        3
      )
      .setImmovable(true)
      .setOrigin(0, 0);
    this.colliders.push(bottomLine);
    this.add(bottomLine);

    const baseXPosition =
      this.side === "left"
        ? -this.stadium.stadiumWidth / 2 -
          calculatePercentage(12, this.stadium.stadiumHeight)
        : this.stadium.stadiumWidth / 2 +
          calculatePercentage(12, this.stadium.stadiumHeight) +
          1;

    const base = this.scene.physics.add
      .image(baseXPosition, 0, "default")
      .setDisplaySize(3, calculatePercentage(30, this.stadium.stadiumHeight))
      .setImmovable(true)
      .setOrigin(0, 0.5);
    this.colliders.push(base);
    this.add(base);
  }

  addLeftGoalLine() {
    this.goalLine = this.scene.add
      .image(-this.stadium.stadiumWidth / 2, 0, "default")
      .setDisplaySize(3, calculatePercentage(30, this.stadium.stadiumHeight))
      .setOrigin(0, 0.5)
      .setAlpha(0.3);
    this.add(this.goalLine);
  }

  addRightGoalLine() {
    this.goalLine = this.scene.add
      .image(
        this.stadium.stadiumWidth / 2 - this.stadium.lineWidth,
        0,
        "default"
      )
      .setDisplaySize(3, calculatePercentage(30, this.stadium.stadiumHeight))
      .setOrigin(0, 0.5)
      .setAlpha(0.3);
    this.add(this.goalLine);
  }
}
