import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "../../../stadium";
import { hexStringToNumber } from "@/app/utils/helperFunctions";

export class SpectatorsLine extends Phaser.GameObjects.Container {
  blitter!: Phaser.GameObjects.Blitter;

  hostFans: Phaser.GameObjects.Bob[] = [];
  guestFans: Phaser.GameObjects.Bob[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public colorProperties: {
      hostFansColor: string;
      guestFanstColor: string;
      hostFansChance: number;
    },
    public stadium: Stadium,
    public direction: string,
    public quanitity: number
  ) {
    super(scene, x, y);

    scene.add.existing(this);
    this.init();
  }

  init() {
    this.blitter = this.scene.add.blitter(0, 0, "undefined");

    if (this.direction === "topLine") {
      this.blitter = this.scene.add.blitter(0, 0, "fanFromTopSide");
      this.addTopLine();
    }
    if (this.direction === "bottomLine") {
      this.blitter = this.scene.add.blitter(0, 0, "fanFromBottomSide");
      this.addBottomLine();
    }
    if (this.direction === "leftLine") {
      this.blitter = this.scene.add.blitter(0, 0, "fanFromRightSide");
      this.addLeftLine();
    }
    if (this.direction === "rightLine") {
      this.blitter = this.scene.add.blitter(0, 0, "fanFromLeftSide");
      this.addRightLine();
    }
  }

  addRightLine() {
    let posY = 4;
    for (let i = 0; i < this.quanitity; i++) {
      const randomNumber = getRandomNumber(0, 100);

      const color =
        randomNumber > this.colorProperties.hostFansChance
          ? this.colorProperties.guestFanstColor
          : this.colorProperties.hostFansColor;

      const fan = this.blitter
        .create(0, posY)
        .setTint(hexStringToNumber(color));
      randomNumber > this.colorProperties.hostFansChance
        ? this.guestFans.push(fan)
        : this.hostFans.push(fan);

      this.add(this.blitter);

      posY += calculatePercentage(2, this.stadium.getBounds().width);
    }
  }

  addLeftLine() {
    let posY = 4;
    for (let i = 0; i < this.quanitity; i++) {
      const randomNumber = getRandomNumber(0, 100);

      const color =
        randomNumber > this.colorProperties.hostFansChance
          ? this.colorProperties.guestFanstColor
          : this.colorProperties.hostFansColor;
      const fan = this.blitter
        .create(0, posY)
        .setTint(hexStringToNumber(color));
      this.add(this.blitter);

      randomNumber > this.colorProperties.hostFansChance
        ? this.guestFans.push(fan)
        : this.hostFans.push(fan);

      posY += calculatePercentage(2, this.stadium.getBounds().width);
    }
  }

  addBottomLine() {
    let posX = 0;
    for (let i = 0; i < this.quanitity; i++) {
      const randomNumber = getRandomNumber(0, 100);

      const color =
        randomNumber > this.colorProperties.hostFansChance
          ? this.colorProperties.guestFanstColor
          : this.colorProperties.hostFansColor;
      const fan = this.blitter
        .create(posX, 0)
        .setTint(hexStringToNumber(color));
      this.add(this.blitter);

      randomNumber > this.colorProperties.hostFansChance
        ? this.guestFans.push(fan)
        : this.hostFans.push(fan);

      posX += calculatePercentage(2, this.stadium.getBounds().width);
    }
  }

  addTopLine() {
    const randomNumber = getRandomNumber(0, 100);

    let posX = 0;
    for (let i = 0; i < this.quanitity; i++) {
      const color =
        getRandomNumber(0, 100) > this.colorProperties.hostFansChance
          ? this.colorProperties.guestFanstColor
          : this.colorProperties.hostFansColor;
      const fan = this.blitter
        .create(posX, 0)
        .setTint(hexStringToNumber(color));
      this.add(this.blitter);

      randomNumber > this.colorProperties.hostFansChance
        ? this.guestFans.push(fan)
        : this.hostFans.push(fan);

      posX += calculatePercentage(2, this.stadium.getBounds().width);
    }
  }
}
