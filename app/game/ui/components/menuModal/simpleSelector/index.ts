import { calculatePercentage } from "@/app/utils/math";

export class SimpleSelector extends Phaser.GameObjects.Container {
  valueText!: Phaser.GameObjects.Text;
  valueIndex = 0;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public values: string[],
    public defaultValie: string,
    public changeValue?: (value: string) => void,
    public title?: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.valueIndex = this.values.indexOf(this.defaultValie);

    this.addLeftArrow();
    this.addRightArrow();
    this.addValueText();

    if (this.title) {
      this.addTitle();
    }
  }

  addTitle() {
    const title = this.scene.add
      .text(0, -calculatePercentage(80, this.getBounds().height), this.title!, {
        align: "center",
        color: "#A3A3A3",
        fontSize: `${calculatePercentage(1.3, this.scene.game.canvas.width)}px`,
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0.5);

    this.add(title);
  }

  addLeftArrow() {
    const leftArrow = this.scene.add
      .image(-calculatePercentage(10, this.scene.game.canvas.width), 0, "arrow")
      .setScale(calculatePercentage(0.06, this.scene.game.canvas.width))
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.valueIndex =
          (this.valueIndex - 1 + this.values.length) % this.values.length;
        this.valueText.setText(this.values[this.valueIndex]);

        if (this.changeValue) {
          this.changeValue(this.values[this.valueIndex]);
        }
      });

    this.add(leftArrow);
  }

  addRightArrow() {
    const rightArrow = this.scene.add
      .image(calculatePercentage(10, this.scene.game.canvas.width), 0, "arrow")
      .setScale(calculatePercentage(0.06, this.scene.game.canvas.width))
      .setFlipX(true)
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.valueIndex = (this.valueIndex + 1) % this.values.length;
        this.valueText.setText(this.values[this.valueIndex]);

        if (this.changeValue) {
          this.changeValue(this.values[this.valueIndex]);
        }
      });

    this.add(rightArrow);
  }

  addValueText() {
    this.valueText = this.scene.add
      .text(0, 0, this.values[this.valueIndex], {
        align: "center",
        color: "#ffffff",
        fontSize: `${calculatePercentage(1.7, this.scene.game.canvas.width)}px`,
        fontFamily: "Rubik Mono One",
      })
      .setOrigin(0.5);

    this.add(this.valueText);
  }
}
