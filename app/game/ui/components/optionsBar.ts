import { TeamData } from "@/app/config/initialTeamsData";
import {
  calculatePercentage,
  interpolate,
  mapToPercentageInRange,
} from "@/app/utils/math";

export class OptionsBar extends Phaser.GameObjects.Container {
  indicator!: Phaser.GameObjects.Image;

  background!: Phaser.GameObjects.Image;

  indicatorTextObject!: Phaser.GameObjects.Text;
  indicatorValue = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public width: number,
    public opttionName: string,
    public team: TeamData
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.calculateStength();
    this.addBackground();
    this.addIndicator();
    this.addTexts();
  }

  calculateStength() {
    this.indicatorValue =
      mapToPercentageInRange(this.team.strength, 800, 2130) + 1;
  }

  setChangedParameters() {
    this.team!.strength = interpolate(this.indicatorValue, 800, 2130);
  }

  addTexts() {
    this.indicatorTextObject = this.scene.add
      .text(
        0,
        -calculatePercentage(90, this.getBounds().height),
        this.indicatorValue.toString(),
        {
          align: "center",
          color: "#dbb245",
          fontSize: "20px",
          fontFamily: "Rubik Mono One",
        }
      )
      .setOrigin(0.5);
    this.add(this.indicatorTextObject);

    const optionText = this.scene.add
      .text(
        -this.background.displayWidth / 2,
        -calculatePercentage(50, this.getBounds().height),
        this.opttionName,
        {
          align: "left",
          color: "#dbb245",
          fontSize: "15px",
          fontFamily: "Rubik Mono One",
        }
      )
      .setOrigin(0, 0.5);

    this.add(optionText);
  }

  addBackground() {
    this.background = this.scene.add
      .image(0, 0, "default")
      .setDisplaySize(
        this.width,
        calculatePercentage(2.5, this.scene.game.canvas.height)
      )
      .setOrigin(0.5)
      .setTint(0x636261);
    this.add(this.background);
  }

  addIndicator() {
    this.indicator = this.scene.add
      .image(-this.getBounds().width / 2, 0, "default")
      .setDisplaySize(
        calculatePercentage(200, this.getBounds().height),
        calculatePercentage(200, this.getBounds().height)
      )
      .setTint(0xdbb245)
      .setOrigin(0.5)
      .setInteractive({ draggable: true });

    this.scene.input.on(
      "drag",
      (pointer: any, gameObject: any, dragX: any, dragY: any) => {
        // Calculate the boundaries for the indicator's motion

        //for typescrippt error
        if (1 > 100) {
          console.log(pointer);
          console.log(dragY);
        }

        if (gameObject !== this.indicator) return;
        const minX = 0;
        const maxX = this.width;

        // Limit the indicator's position within the calculated boundaries
        const clampedX = Phaser.Math.Clamp(
          dragX,
          minX - this.background.displayWidth / 2,
          maxX - this.background.displayWidth / 2
        );

        // Update the indicator's position
        gameObject.setPosition(clampedX, gameObject.y);

        this.indicatorValue = Math.floor(
          ((clampedX - minX) / (maxX - minX)) * 100 + 50
        );
        this.indicatorTextObject.setText(this.indicatorValue.toString());
        this.setChangedParameters();
      }
    );

    this.indicator.setPosition(
      calculatePercentage(this.indicatorValue - 50, this.width),
      0
    );

    this.add(this.indicator);
  }
}
