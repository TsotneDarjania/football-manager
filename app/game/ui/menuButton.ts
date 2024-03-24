import { calculatePercentage } from "@/app/utils/math";

export class MenuButton extends Phaser.GameObjects.Container {
  backgroundImage!: Phaser.GameObjects.Image;
  innerText!: Phaser.GameObjects.Text;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public width: number,
    public text: string,
    public backgroundColor: number,
    public textColor: string,
    public fontSize: number = 25
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addBackground();
    this.addText();
    this.makeInteractive();

    this.setScale(0.7);
  }

  addBackground() {
    this.backgroundImage = this.scene.add
      .image(0, 0, "default")

      .setOrigin(0.5)
      .setTint(this.backgroundColor)
      .setDisplaySize(this.width, 2);
    this.add(this.backgroundImage);
  }

  addText() {
    this.innerText = this.scene.add
      .text(
        0,
        -calculatePercentage(4, this.scene.game.canvas.height),
        this.text,
        {
          fontFamily: "Silkscreen",
          fontSize: this.fontSize,
          color: this.textColor,
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.add(this.innerText);
  }

  makeInteractive() {
    this.setInteractive(
      new Phaser.Geom.Rectangle(
        0,
        -calculatePercentage(5, this.scene.game.canvas.height),
        this.getBounds().width,
        this.getBounds().height
      ),
      Phaser.Geom.Rectangle.Contains
    );
    this.on(Phaser.Input.Events.POINTER_OVER, () => {
      this.backgroundImage.setTint(0xfa494b);
      this.innerText.setColor("#FA494B");
    });
    this.on(Phaser.Input.Events.POINTER_OUT, () => {
      this.backgroundImage.setTint(this.backgroundColor);
      this.innerText.setColor(this.textColor);
    });
    this.input!.cursor = "pointer";
  }
}
