import { calculatePercentage } from "@/app/utils/math";
import { GoalPost } from "./goalPost";
import { StadiumSurrounding } from "./stadiumSurrounding/stadiumSurrounding";

export class Stadium extends Phaser.GameObjects.Container {
  graphics!: Phaser.GameObjects.Graphics;
  colliders: Array<Phaser.Physics.Arcade.Image> = [];

  leftGoalPost!: GoalPost;
  rightGoalPost!: GoalPost;

  //pharametres
  lineWidth = 3;
  lineColor = 0xf1ffff;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public stadiumWidth: number,
    public stadiumHeight: number,
    public leftFansChance: number,
    public leftFansColor: number,
    public righFanstColor: number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addSurrouding();
    this.addPitch();
  }

  addPitch() {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(this.lineWidth, this.lineColor, 0.6);
    this.graphics.fillStyle(0xfbf9f3, 1);

    // Center circles
    this.graphics
      .fillCircle(0, 0, calculatePercentage(1.2, this.stadiumHeight))
      .setAlpha(0.6);

    this.graphics.strokeCircle(
      0,
      0,
      calculatePercentage(15.2, this.stadiumHeight)
    );

    this.addBackground();
    this.addLines();
    this.addGoalPosts();
  }

  addBackground() {
    const image = this.scene.add
      .image(0, 0, "grass")
      .setDisplaySize(this.stadiumWidth + 160, this.stadiumHeight + 50)
      .setOrigin(0.5);
    this.add(image);
  }

  addLines() {
    const topLine = this.scene.physics.add
      .image(1, -this.stadiumHeight / 2, "default")
      .setDisplaySize(this.stadiumWidth + 1, this.lineWidth)
      .setImmovable(true)
      .setTint(this.lineColor);
    this.add(topLine);
    this.colliders.push(topLine);

    const bottomLine = this.scene.physics.add
      .image(1, this.stadiumHeight / 2, "default")
      .setDisplaySize(this.stadiumWidth + 1, this.lineWidth)
      .setImmovable(true)
      .setTint(this.lineColor);
    this.add(bottomLine);
    this.colliders.push(bottomLine);

    const centerLine = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(3, this.stadiumHeight)
      .setAlpha(0.6);
    this.add(centerLine);

    const leftTopLine = this.scene.physics.add
      .image(-this.stadiumWidth / 2, -this.stadiumHeight / 2, "default")
      .setDisplaySize(
        this.lineWidth,
        calculatePercentage(35, this.stadiumHeight)
      )
      .setOrigin(0)
      .setImmovable(true)
      .setTint(this.lineColor);
    this.add(leftTopLine);
    this.colliders.push(leftTopLine);

    const leftBottomLine = this.scene.physics.add
      .image(-this.stadiumWidth / 2, this.stadiumHeight / 2, "default")
      .setDisplaySize(
        this.lineWidth,
        calculatePercentage(35, this.stadiumHeight)
      )
      .setOrigin(0, 1)
      .setImmovable(true)
      .setTint(this.lineColor);
    this.add(leftBottomLine);
    this.colliders.push(leftBottomLine);

    const rightTopLine = this.scene.physics.add
      .image(this.stadiumWidth / 2, -this.stadiumHeight / 2, "default")
      .setDisplaySize(
        this.lineWidth,
        calculatePercentage(35, this.stadiumHeight)
      )
      .setOrigin(0)
      .setImmovable(true)
      .setTint(this.lineColor);
    this.add(rightTopLine);
    this.colliders.push(rightTopLine);

    const rightBottomLine = this.scene.physics.add
      .image(this.stadiumWidth / 2, this.stadiumHeight / 2, "default")
      .setDisplaySize(
        this.lineWidth,
        calculatePercentage(35, this.stadiumHeight)
      )
      .setOrigin(0, 1)
      .setImmovable(true)
      .setTint(this.lineColor);
    this.add(rightBottomLine);
    this.colliders.push(rightBottomLine);

    const leftSmallRectangle = this.graphics.strokeRect(
      -this.stadiumWidth / 2 + 1,
      -calculatePercentage(20, this.stadiumHeight),
      calculatePercentage(8, this.stadiumWidth),
      calculatePercentage(40, this.stadiumHeight)
    );
    this.add(leftSmallRectangle);

    const leftBigRectangle = this.graphics.strokeRect(
      -this.stadiumWidth / 2 + 1,
      -calculatePercentage(30, this.stadiumHeight),
      calculatePercentage(14, this.stadiumWidth),
      calculatePercentage(60, this.stadiumHeight)
    );
    this.add(leftBigRectangle);

    const rightSmallRectangle = this.graphics.strokeRect(
      this.stadiumWidth / 2 - calculatePercentage(8, this.stadiumWidth),
      -calculatePercentage(20, this.stadiumHeight),
      calculatePercentage(8, this.stadiumWidth),
      calculatePercentage(40, this.stadiumHeight)
    );
    this.add(rightSmallRectangle);

    const rightBigRectangle = this.graphics.strokeRect(
      this.stadiumWidth / 2 - calculatePercentage(14, this.stadiumWidth),
      -calculatePercentage(30, this.stadiumHeight),
      calculatePercentage(14, this.stadiumWidth),
      calculatePercentage(60, this.stadiumHeight)
    );
    this.add(rightBigRectangle);
  }

  addGoalPosts() {
    this.leftGoalPost = new GoalPost(this.scene, "left", this);
    this.add(this.leftGoalPost);

    this.rightGoalPost = new GoalPost(this.scene, "right", this);
    this.add(this.rightGoalPost);
  }

  addSurrouding() {
    const surrounding = new StadiumSurrounding(
      this.scene,
      0,
      0,
      this,
      this.leftFansChance,
      this.leftFansColor,
      this.righFanstColor
    ).setDepth(-10);
    this.add(surrounding);
  }
}
