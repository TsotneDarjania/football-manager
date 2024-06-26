import { calculatePercentage, getRandomNumber } from "@/app/utils/math";
import { Stadium } from "./stadium";
import EventEmitter from "events";
import { Footballer } from "./team/footballer";

export class Ball extends Phaser.Physics.Arcade.Image {
  private eventEmitter: EventEmitter = new EventEmitter();

  goalAnimation!: Phaser.Tweens.Tween;
  blinkTween!: Phaser.Tweens.Tween;

  anglurarVelocity = 800;

  isCorner = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public stadium: Stadium
  ) {
    super(scene, x, y, "ball");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setScale(calculatePercentage(0.04, stadium.stadiumWidth));
    this.setDepth(10);

    this.init();
  }

  init() {
    this.setBounce(1, 1);
    this.setCircle(
      calculatePercentage(90, this.displayWidth),
      calculatePercentage(60, this.displayWidth),
      calculatePercentage(60, this.displayHeight)
    );

    this.makeTail();
  }

  reset() {
    this.setPosition(
      this.scene.game.canvas.width / 2,
      this.scene.game.canvas.height / 2
    );
    this.setVelocity(0, 0);
    this.setAlpha(1);
    this.setAngularVelocity(0);
    this.stopGoalAnimation();
  }

  isGoal() {
    this.setAngularVelocity(0);
    this.setVelocity(0, 0);
    this.setPosition(this.x, this.y);
    this.startGoalAnimation();
  }

  stopOnCorner() {
    this.isCorner = true;
    this.setAngularVelocity(0);
    this.setVelocity(0, 0);
    this.setPosition(this.x, this.y);
  }

  startGoalAnimation() {
    let count = 0;
    if (this.goalAnimation !== undefined) {
      this.goalAnimation.resume();
    } else {
      this.goalAnimation = this.scene.tweens.add({
        targets: this,
        alpha: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 300,
        onRepeat: () => {
          count += 1;
          if (count > 6) {
            count = 0;
            this.eventEmitter.emit("finishGoalAniamtion");
          }
        },
      });
    }
  }

  onFinishGoalAnimation(callback: () => void) {
    this.eventEmitter.on("finishGoalAniamtion", callback);
  }

  stopGoalAnimation() {
    this.goalAnimation?.pause();
  }

  firstKick(x: number, y: number) {
    this.scene.physics.moveTo(this, x, y, 200);
    this.setAngularVelocity(this.anglurarVelocity);
  }

  kick(speed: number, x: number, y: number) {
    this.scene.physics.moveTo(this, x, y, speed);
    this.setAngularVelocity(this.anglurarVelocity);
  }

  makeTail() {
    this.scene.events.on("update", () => {
      new Circle(this.scene, this);
    });
  }

  changeRotation() {
    if (this.isCorner) return;
    this.anglurarVelocity = -this.anglurarVelocity;
    this.setAngularVelocity(-this.anglurarVelocity);
  }

  goToCorner(side: "left" | "right", footballer: Footballer) {
    footballer.controllBall = true;

    const posX =
      side === "left"
        ? this.stadium.leftGoalPost.getBounds().centerX - 50
        : this.stadium.rightGoalPost.getBounds().centerX + 50;
    const posY =
      footballer.getBounds().y > this.stadium.leftGoalPost.getBounds().centerY
        ? this.stadium.leftGoalPost.getBounds().centerY +
          getRandomNumber(200, 200)
        : this.stadium.leftGoalPost.getBounds().centerY -
          getRandomNumber(200, 200);

    this.kick(160, posX, posY);

    setTimeout(() => {
      footballer.controllBall = false;
    }, 400);
  }

  stop() {
    this.setVelocity(0, 0);
    this.setAngularVelocity(0);
    this.setPosition(this.x, this.y);
  }

  startBlink() {
    if (this.blinkTween) {
      this.blinkTween.resume();
      return;
    }

    this.blinkTween = this.scene.tweens.add({
      targets: this,
      alpha: 0,
      repeat: -1,
      yoyo: true,
      duration: 150,
    });
  }

  stopBlink() {
    this.blinkTween?.pause();
    this.setAlpha(1);
  }
}

class Circle {
  constructor(public scene: Phaser.Scene, public ball: Ball) {
    let circle = scene.add.circle(
      ball.x,
      ball.y,
      calculatePercentage(30, ball.displayWidth),
      0xe1ffff
    );

    scene.tweens.add({
      targets: circle,
      alpha: 0,
      duration: 500,
      radius: 0,
      onComplete: () => {
        circle.destroy(true);
      },
    });
  }
}
