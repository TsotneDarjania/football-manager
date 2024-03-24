import Menu from "@/app/game/scenes/menu";
import MenuModal from "..";
import { calculatePercentage } from "@/app/utils/math";
import { SimpleSelector } from "../simpleSelector";

export class SettingsModal extends MenuModal {
  constructor(scene: Menu, x: number, y: number) {
    super(scene, x, y);
    this.initialization();
  }

  initialization() {
    this.addOptions();
  }

  addOptions() {
    const timeOptions = new SimpleSelector(
      this.scene,
      0,
      -calculatePercentage(20, this.scene.game.canvas.height),
      ["1 min", "1.5 min", "2 min", "2.5 min", "3 min", "5 min"],
      "3 min"
    );
    this.add(timeOptions);

    const stadiumOptions = new SimpleSelector(
      this.scene,
      0,
      0,
      ["Small", "Medium", "Big", "Mega"],
      "Medium"
    );
    this.add(stadiumOptions);

    const playStyleOptions = new SimpleSelector(
      this.scene,
      0,
      calculatePercentage(20, this.scene.game.canvas.height),
      ["Classic", "Experimental"],
      "Classic"
    );
    this.add(playStyleOptions);
  }
}
