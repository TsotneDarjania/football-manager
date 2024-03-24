export class MenuButton extends Phaser.GameObjects.Container {
  innerText!: Phaser.GameObjects.Text;

  leftBorder!: Phaser.GameObjects.Image;
  leftBorderHoverX!: number;
  leftBorderHoverY!: number;

  rightBorder!: Phaser.GameObjects.Image;
  rightBorderHoverX!: number;
  rightBorderHoverY!: number;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public width: number,
    public height: number,
    public text: string,
    public onClick: () => void
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addText();
    this.addBorders();
  }

  addBorders() {
    this.leftBorder = this.scene.add
      .image(-this.getBounds().width / 2 - 8, -8, "arrow")
      .setOrigin(1)
      .setAngle(45);
    this.add(this.leftBorder);

    this.leftBorderHoverX = this.leftBorder.x + 10;
    this.leftBorderHoverY = this.leftBorder.y + 10;

    this.rightBorder = this.scene.add
      .image(this.getBounds().width / 2 + 23, -10, "arrow")
      .setOrigin(0, 1)
      .setAngle(225);
    this.add(this.rightBorder);

    this.rightBorderHoverX = this.rightBorder.x - 10;
    this.rightBorderHoverY = this.rightBorder.y - 10;
  }

  addText() {
    this.innerText = this.scene.add
      .text(0, -25, this.text, {
        fontFamily: "Rubik Mono One",
        fontSize: "15px",
        color: "#ffffff",
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, this.onClick)
      .on(Phaser.Input.Events.POINTER_OVER, () => {
        this.scene.tweens.add({
          targets: this.leftBorder,
          x: this.leftBorderHoverX,
          y: this.leftBorderHoverY,
          duration: 100,
        });

        this.scene.tweens.add({
          targets: this.rightBorder,
          x: this.rightBorderHoverX,
          y: this.rightBorderHoverY,
          duration: 100,
        });
      })
      .on(Phaser.Input.Events.POINTER_OUT, () => {
        this.scene.tweens.add({
          targets: this.leftBorder,
          x: this.leftBorderHoverX - 10,
          y: this.leftBorderHoverY - 10,
          duration: 100,
        });

        this.scene.tweens.add({
          targets: this.rightBorder,
          x: this.rightBorderHoverX + 10,
          y: this.rightBorderHoverY + 10,
          duration: 100,
        });
      });
    this.add(this.innerText);
  }
}
