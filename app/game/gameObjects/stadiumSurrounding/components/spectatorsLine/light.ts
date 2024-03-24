export class Light extends Phaser.GameObjects.Container {
  triangle!: Phaser.GameObjects.Image;

  constructor(scene: Phaser.Scene, x: number, y: number, public pos: string) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    if (this.pos === "leftTop") {
      this.addLeftTop();
    }
    if (this.pos === "rightTop") {
      this.addRightTop();
    }
    if (this.pos === "leftBottom") {
      this.addLeftBottom();
    }
    if (this.pos === "rightBottom") {
      this.addRightBottom();
    }

    this.startAnimation();
  }

  addRightBottom() {
    this.triangle = this.scene.add
      .image(-50, -50, "triangle")
      .setOrigin(0.5)
      .setFlipY(true)
      .setAngle(-45)
      .setAlpha(0.4)
      .setScale(4);
    this.add(this.triangle);

    const light = this.scene.add
      .image(0, 0, "default")
      .setTint(0xf06e0c)
      .setAngle(-45)
      .setDisplaySize(30, 36)
      .setOrigin(0.5);
    this.add(light);
  }

  addLeftBottom() {
    this.triangle = this.scene.add
      .image(50, -50, "triangle")
      .setOrigin(0.5)
      .setFlipY(true)
      .setAngle(45)
      .setAlpha(0.4)
      .setScale(4);
    this.add(this.triangle);

    const light = this.scene.add
      .image(0, 0, "default")
      .setTint(0xf06e0c)
      .setAngle(45)
      .setDisplaySize(30, 36)
      .setOrigin(0.5);
    this.add(light);
  }

  addRightTop() {
    this.triangle = this.scene.add
      .image(-50, 50, "triangle")
      .setOrigin(0.5)
      .setAngle(45)
      .setAlpha(0.4)
      .setScale(4);
    this.add(this.triangle);

    const light = this.scene.add
      .image(0, 0, "default")
      .setTint(0xf06e0c)
      .setAngle(45)
      .setDisplaySize(30, 36)
      .setOrigin(0.5);
    this.add(light);
  }

  addLeftTop() {
    this.triangle = this.scene.add
      .image(50, 50, "triangle")
      .setOrigin(0.5)
      .setAngle(-45)
      .setAlpha(0.4)
      .setScale(4);
    this.add(this.triangle);

    const light = this.scene.add
      .image(0, 0, "default")
      .setTint(0xf06e0c)
      .setAngle(-45)
      .setDisplaySize(30, 36)
      .setOrigin(0.5);
    this.add(light);
  }

  startAnimation() {
    let anglePharameters;
    if (this.pos === "leftTop") {
      anglePharameters = { from: -45, to: 45 };
    }

    if (this.pos === "rightTop") {
      anglePharameters = { from: 45, to: -45 };
    }

    if (this.pos === "leftBottom") {
      anglePharameters = { from: 45, to: -45 };
    }

    if (this.pos === "rightBottom") {
      anglePharameters = { from: -45, to: 45 };
    }

    this.scene.tweens.add({
      targets: this,
      duration: 2500,
      angle: anglePharameters,
      repeat: -1,
      yoyo: true,
    });

    this.scene.tweens.add({
      targets: this.triangle,
      duration: 400,
      alpha: 0,
      repeat: -1,
      yoyo: true,
    });
  }

  stopAnimation() {}
}
