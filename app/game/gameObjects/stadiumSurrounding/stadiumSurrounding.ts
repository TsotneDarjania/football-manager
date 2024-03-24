import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "../stadium";
import { SpectatorsLine } from "./components/spectatorsLine/spectatorsLine";
import { Light } from "./components/spectatorsLine/light";

export class StadiumSurrounding extends Phaser.GameObjects.Container {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public stadium: Stadium,
    public hostFansChance: number,
    public hostFansColor: number,
    public guestFanstColor: number
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.setDepth(-10);
    this.addSpectators();
    this.addSurrounding();
    this.addLights();
  }

  addLights() {
    const topLeftLight = new Light(
      this.scene,
      -calculatePercentage(50, this.stadium.getBounds().width),
      -calculatePercentage(51, this.stadium.getBounds().height),
      "leftTop"
    );
    this.add(topLeftLight);

    const topRightLight = new Light(
      this.scene,
      calculatePercentage(50, this.stadium.getBounds().width),
      -calculatePercentage(50, this.stadium.getBounds().height),
      "rightTop"
    );
    this.add(topRightLight);

    const bottomLeftLight = new Light(
      this.scene,
      -calculatePercentage(50, this.stadium.getBounds().width),
      calculatePercentage(50, this.stadium.getBounds().height),
      "leftBottom"
    );
    this.add(bottomLeftLight);

    const bottomRightLight = new Light(
      this.scene,
      calculatePercentage(50, this.stadium.getBounds().width),
      calculatePercentage(50, this.stadium.getBounds().height),
      "rightBottom"
    );
    this.add(bottomRightLight);
  }

  addSurrounding() {
    const leftBorder = this.scene.add
      .image(
        -calculatePercentage(63, this.stadium.getBounds().width),
        0,
        "roof"
      )
      .setTint(0x467572)
      .setAngle(90)
      .setDisplaySize(600, 20);
    this.add(leftBorder);

    const rightBorder = this.scene.add
      .image(calculatePercentage(63, this.stadium.getBounds().width), 0, "roof")
      .setTint(0x467572)
      .setAngle(90)
      .setDisplaySize(600, 20);
    this.add(rightBorder);

    const topBorder = this.scene.add
      .image(
        0,
        -calculatePercentage(75.6, this.stadium.getBounds().height),
        "roof"
      )
      .setTint(0x467572)
      .setDisplaySize(1200, 15);
    this.add(topBorder);

    const bottomBorder = this.scene.add
      .image(
        0,
        calculatePercentage(75.6, this.stadium.getBounds().height),
        "roof"
      )
      .setTint(0x467572)
      .setDisplaySize(1200, 15);
    this.add(bottomBorder);

    const leftTopCorner = this.scene.add
      .image(
        -this.stadium.getBounds().width / 2 -
          calculatePercentage(31, this.stadium.getBounds().width),
        -calculatePercentage(96, this.stadium.getBounds().height),
        "default"
      )
      .setDisplaySize(
        calculatePercentage(14, this.stadium.getBounds().width),
        calculatePercentage(37, this.stadium.getBounds().width)
      )
      .setAngle(-45)
      .setOrigin(0)
      .setTint(0x467572);
    this.add(leftTopCorner);

    const rightTopCorner = this.scene.add
      .image(
        this.stadium.getBounds().width / 2 +
          calculatePercentage(21.5, this.stadium.getBounds().width),
        -calculatePercentage(116, this.stadium.getBounds().height),
        "default"
      )
      .setDisplaySize(
        calculatePercentage(14, this.stadium.getBounds().width),
        calculatePercentage(37, this.stadium.getBounds().width)
      )
      .setAngle(45)
      .setOrigin(0)
      .setTint(0x467572);
    this.add(rightTopCorner);

    const leftBottomCorner = this.scene.add
      .image(
        -this.stadium.getBounds().width / 2 -
          calculatePercentage(31, this.stadium.getBounds().width),
        calculatePercentage(96, this.stadium.getBounds().height),
        "default"
      )
      .setDisplaySize(
        calculatePercentage(14, this.stadium.getBounds().width),
        calculatePercentage(37, this.stadium.getBounds().width)
      )
      .setAngle(45)
      .setOrigin(0, 1)
      .setTint(0x467572);
    this.add(leftBottomCorner);

    const rightBottomCorner = this.scene.add
      .image(
        this.stadium.getBounds().width / 2 +
          calculatePercentage(21.5, this.stadium.getBounds().width),
        calculatePercentage(116, this.stadium.getBounds().height),
        "default"
      )
      .setDisplaySize(
        calculatePercentage(14, this.stadium.getBounds().width),
        calculatePercentage(37, this.stadium.getBounds().width)
      )
      .setAngle(-45)
      .setOrigin(0, 1)
      .setTint(0x467572);
    this.add(rightBottomCorner);
  }

  addSpectators() {
    this.addTopSpectatorLines(8);
    this.addBottomLineSpectators(8);
    this.addLeftSpectatorLines(8);
    this.addRightSpectatorLines(8);
  }

  addRightSpectatorLines(quantity: number) {
    let posX = calculatePercentage(50, this.stadium.getBounds().width);
    for (let i = 0; i < quantity; i++) {
      const spectatorsLine = new SpectatorsLine(
        this.scene,
        posX,
        -this.stadium.getBounds().height / 2,
        {
          hostFansColor: this.hostFansColor,
          guestFanstColor: this.guestFanstColor,
          hostFansChance: this.hostFansChance,
        },
        this.stadium,
        "rightLine"
      );
      this.add(spectatorsLine);

      posX += calculatePercentage(3.3, this.stadium.getBounds().height);
    }
  }

  addLeftSpectatorLines(quantity: number) {
    let posX = -calculatePercentage(50, this.stadium.getBounds().width);
    for (let i = 0; i < quantity; i++) {
      const spectatorsLine = new SpectatorsLine(
        this.scene,
        posX,
        -this.stadium.getBounds().height / 2,
        {
          hostFansColor: this.hostFansColor,
          guestFanstColor: this.guestFanstColor,
          hostFansChance: this.hostFansChance,
        },
        this.stadium,
        "leftLine"
      );
      this.add(spectatorsLine);

      posX -= calculatePercentage(3.3, this.stadium.getBounds().height);
    }
  }

  addBottomLineSpectators(quantity: number) {
    let posY = calculatePercentage(50, this.stadium.getBounds().height);
    for (let i = 0; i < quantity; i++) {
      const spectatorsLine = new SpectatorsLine(
        this.scene,
        -this.stadium.getBounds().width / 2,
        posY,
        {
          hostFansColor: this.hostFansColor,
          guestFanstColor: this.guestFanstColor,
          hostFansChance: this.hostFansChance,
        },
        this.stadium,
        "bottomLine"
      );
      this.add(spectatorsLine);

      posY += calculatePercentage(3, this.stadium.getBounds().height);
    }
  }

  addTopSpectatorLines(quantity: number) {
    let posY = -calculatePercentage(50, this.stadium.getBounds().height);
    for (let i = 0; i < quantity; i++) {
      const spectatorsLine = new SpectatorsLine(
        this.scene,
        -this.stadium.getBounds().width / 2,
        posY,
        {
          hostFansColor: this.hostFansColor,
          guestFanstColor: this.guestFanstColor,
          hostFansChance: this.hostFansChance,
        },
        this.stadium,
        "topLine"
      );
      this.add(spectatorsLine);

      posY -= calculatePercentage(3, this.stadium.getBounds().height);
    }
  }
}
