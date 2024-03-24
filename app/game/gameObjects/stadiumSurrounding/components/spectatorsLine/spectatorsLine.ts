import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "../../../stadium";

export class SpectatorsLine extends Phaser.GameObjects.Container {
  imageGroup: Phaser.GameObjects.Group = this.scene.add.group();

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public colorProperties: {
      hostFansColor: number;
      guestFanstColor: number;
      hostFansChance: number;
    },
    public stadium: Stadium,
    public direction: string
  ) {
    super(scene, x, y);

    scene.add.existing(this);
    this.init();
  }

  init() {
    if (this.direction === "topLine") {
      this.addTopLine();
    }
    if (this.direction === "bottomLine") {
      this.addBottomLine();
    }
    if (this.direction === "leftLine") {
      this.addLeftLine();
    }
    if (this.direction === "rightLine") {
      this.addRightLine();
    }
  }

  addRightLine() {
    let posY = 4;
    for (
      let i = 0;
      i <
      Math.floor(
        this.stadium.getBounds().height /
          calculatePercentage(2, this.stadium.getBounds().width)
      );
      i++
    ) {
      const color =
        getRandomNumber(0, 100) > this.colorProperties.hostFansChance
          ? this.colorProperties.guestFanstColor
          : this.colorProperties.hostFansColor;
      const image = this.imageGroup
        .get(0, posY, "fan")
        .setDisplaySize(
          calculatePercentage(2, this.stadium.getBounds().width),
          calculatePercentage(2, this.stadium.getBounds().width)
        )
        .setRotation(-Phaser.Math.DegToRad(90))
        .setTint(color)
        .setOrigin(1, 0);
      this.add(image);

      posY += calculatePercentage(2, this.stadium.getBounds().width);
    }
  }

  addLeftLine() {
    let posY = 4;
    for (
      let i = 0;
      i <
      Math.floor(
        this.stadium.getBounds().height /
          calculatePercentage(2, this.stadium.getBounds().width)
      );
      i++
    ) {
      const color =
        getRandomNumber(0, 100) > this.colorProperties.hostFansChance
          ? this.colorProperties.guestFanstColor
          : this.colorProperties.hostFansColor;
      const image = this.imageGroup
        .get(0, posY, "fan")
        .setDisplaySize(
          calculatePercentage(2, this.stadium.getBounds().width),
          calculatePercentage(2, this.stadium.getBounds().width)
        )
        .setRotation(Phaser.Math.DegToRad(90))
        .setTint(color)
        .setOrigin(0, 0);
      this.add(image);

      posY += calculatePercentage(2, this.stadium.getBounds().width);
    }
  }

  addBottomLine() {
    let posX = 0;
    for (
      let i = 0;
      i <
      Math.floor(
        this.stadium.getBounds().width /
          calculatePercentage(2, this.stadium.getBounds().width) +
          1
      );
      i++
    ) {
      const color =
        getRandomNumber(0, 100) > this.colorProperties.hostFansChance
          ? this.colorProperties.guestFanstColor
          : this.colorProperties.hostFansColor;
      const image = this.imageGroup
        .get(posX, 0, "fan")
        .setDisplaySize(
          calculatePercentage(2, this.stadium.getBounds().width),
          calculatePercentage(2, this.stadium.getBounds().width)
        )
        .setTint(color)
        .setOrigin(0, 0);
      this.add(image);

      posX += calculatePercentage(2, this.stadium.getBounds().width);
    }
  }

  addTopLine() {
    let posX = 0;
    for (
      let i = 0;
      i <
      Math.floor(
        this.stadium.getBounds().width /
          calculatePercentage(2, this.stadium.getBounds().width) +
          1
      );
      i++
    ) {
      const color =
        getRandomNumber(0, 100) > this.colorProperties.hostFansChance
          ? this.colorProperties.guestFanstColor
          : this.colorProperties.hostFansColor;
      const image = this.imageGroup

        .get(posX, 0, "fan")
        .setDisplaySize(
          calculatePercentage(2, this.stadium.getBounds().width),
          calculatePercentage(2, this.stadium.getBounds().width)
        )
        .setTint(color)
        .setOrigin(0, 1)
        .setFlipY(true);
      this.add(image);

      posX += calculatePercentage(2, this.stadium.getBounds().width);
    }
  }
}
