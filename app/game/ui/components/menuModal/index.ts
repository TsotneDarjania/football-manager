import { calculatePercentage } from "@/app/utils/math";
import Menu from "@/app/game/scenes/menu";

export default class MenuModal extends Phaser.GameObjects.Container {
  constructor(public scene: Menu, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.addShadow();
    this.addCloseButton();
  }

  addCloseButton() {
    const closeButton = this.scene.add
      .image(
        calculatePercentage(45, this.scene.game.canvas.width),
        -calculatePercentage(40, this.scene.game.canvas.height),
        "menu-close"
      )
      .setOrigin(0.5)
      .setDisplaySize(
        calculatePercentage(3, this.scene.game.canvas.width),
        calculatePercentage(3, this.scene.game.canvas.width)
      )
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.setVisible(false);

        this.scene.tacticsModal.hostTeamTacticsWindow.simpleModeWindow?.destroy();
        this.scene.tacticsModal.hostTeamTacticsWindow.modeButtons?.setVisible(
          true
        );

        this.scene.tacticsModal.guestTeamTacticsWindow.simpleModeWindow?.destroy();
        this.scene.tacticsModal.guestTeamTacticsWindow.modeButtons?.setVisible(
          true
        );

        this.scene.tacticsButton.setVisible(true);
        this.scene.settingsButton.setVisible(true);
        this.scene.startButton.setVisible(true);
      });

    this.add(closeButton);
  }

  addShadow() {
    const shadow = this.scene.add
      .image(0, 0, "default")
      .setOrigin(0.5)
      .setAlpha(0.9)
      .setTint(0x000000)
      .setDisplaySize(
        this.scene.game.canvas.width,
        this.scene.game.canvas.height
      );

    this.add(shadow);
  }
}
