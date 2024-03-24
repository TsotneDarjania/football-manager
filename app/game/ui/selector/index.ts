import { calculatePercentage, isInRange, makeNegative } from "@/app/utils/math";

export class Selector extends Phaser.GameObjects.Container {
  forwardArrowButton!: Phaser.GameObjects.Image;
  previousArrowButton!: Phaser.GameObjects.Image;

  activeItemsNumber!: number;
  selectedItem!: { image: Phaser.GameObjects.Image; name: string };
  selectedItemIndex!: number;

  arrowClickIsPossible = true;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public items: { image: Phaser.GameObjects.Image; name: string }[],
    public padding: number = 0,
    public direction: "horizontal" | "vertical" = "horizontal",
    public defaultItemName?: string
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.activeItemsNumber =
      Math.floor(this.items.length / 2) <= 5
        ? Math.floor(this.items.length / 2)
        : 5;

    this.activeItemsNumber = 5;

    this.generateStartConditions();
    this.addArrows();
  }

  rotationItems(direction: string) {
    if (direction === "previous") {
      for (const [index, item] of this.items.entries()) {
        if (!this.arrowClickIsPossible) return;
        this.scene.tweens.add({
          targets: item.image,
          y: this.items[(index + 1) % this.items.length].image.y,
          scale: this.items[(index + 1) % this.items.length].image.scale,
          alpha: this.items[(index + 1) % this.items.length].image.alpha,
          duration: 300,
          onComplete: () => {
            this.arrowClickIsPossible = true;
          },
        });
      }
      this.selectedItemIndex =
        this.selectedItemIndex === 0
          ? this.items.length - 1
          : this.selectedItemIndex - 1;
      this.selectedItem = this.items[this.selectedItemIndex];
    } else {
      for (const [index, item] of this.items.entries()) {
        if (!this.arrowClickIsPossible) return;
        this.scene.tweens.add({
          targets: item.image,
          y: this.items[index === 0 ? this.items.length - 1 : index - 1].image
            .y,
          scale:
            this.items[index === 0 ? this.items.length - 1 : index - 1].image
              .scale,
          alpha:
            this.items[index === 0 ? this.items.length - 1 : index - 1].image
              .alpha,
          duration: 300,
          onComplete: () => {
            this.arrowClickIsPossible = true;
          },
        });
      }
      this.selectedItemIndex = (this.selectedItemIndex + 1) % this.items.length;
      this.selectedItem = this.items[this.selectedItemIndex];
    }
    this.arrowClickIsPossible = false;
    this.scene.events.emit("rotate");
  }

  addArrows() {
    this.forwardArrowButton = this.scene.add
      .image(
        0,
        this.items[
          Math.floor(this.items.length / 2) -
            Math.floor(this.activeItemsNumber / 2)
        ].image.y -
          this.items[
            Math.floor(this.items.length / 2) -
              Math.floor(this.activeItemsNumber / 2)
          ].image.displayHeight,
        "arrow"
      )
      .setTint(0xbdbab3)
      .setAngle(90)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.rotationItems("forward");
      });
    this.add(this.forwardArrowButton);

    this.previousArrowButton = this.scene.add
      .image(
        0,
        this.items[
          Math.floor(this.items.length / 2) +
            Math.floor(this.activeItemsNumber / 2)
        ].image.y +
          this.items[
            Math.floor(this.items.length / 2) +
              Math.floor(this.activeItemsNumber / 2)
          ].image.displayHeight /
            2,
        "arrow"
      )
      .setTint(0xbdbab3)
      .setOrigin(1, 0.5)
      .setAngle(-90)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.rotationItems("previous");
      });
    this.add(this.previousArrowButton);
  }

  generateStartConditions() {
    let imagePositionY = this.items[0].image.displayHeight / 2;
    let imagePositionX = this.items[0].image.displayWidth / 2;

    this.selectedItemIndex = this.defaultItemName
      ? this.items.findIndex((item) => {
          return item.name === this.defaultItemName;
        })
      : Math.floor(this.items.length / 2);

    this.selectedItem = this.items[this.selectedItemIndex];
    if (this.selectedItemIndex !== Math.floor(this.items.length / 2)) {
      const selectedItem = this.items[this.selectedItemIndex];
      this.items[this.selectedItemIndex] =
        this.items[Math.floor(this.items.length / 2)];
      this.items[Math.floor(this.items.length / 2)] = selectedItem;
    }

    this.selectedItemIndex = Math.floor(this.items.length / 2);

    for (const [index, item] of this.items.entries()) {
      item.image.setDisplaySize(
        calculatePercentage(4, this.scene.game.canvas.width),
        calculatePercentage(4, this.scene.game.canvas.width)
      );

      // then we need to calculate the position of the next image
      imagePositionY += item.image.displayHeight + this.padding;
      imagePositionX += item.image.displayWidth + this.padding;

      // if the index is in the range of the active items
      if (
        isInRange(
          index,
          Math.floor(this.items.length / 2) -
            Math.floor(this.activeItemsNumber / 2),
          Math.floor(this.items.length / 2) +
            Math.floor(this.activeItemsNumber / 2)
        )
      ) {
        //here we need to calculate the opacity and scale of the image
        const minusOpacity = (Math.floor(this.items.length / 2) - index) / 2.5;
        item.image.setAlpha(1 + makeNegative(minusOpacity));

        const minusScale = (Math.floor(this.items.length / 2) - index) / 5;
        item.image.setScale(item.image.scale + makeNegative(minusScale));

        //then make the image visible
        item.image.setTint(
          Math.floor(this.items.length / 2) === index ? 0xffffff : 0xf5f1e9
        );
      } else {
        item.image.setAlpha(0);
        item.image.setScale(0);
      }
      item.image.setVisible(true);

      this.direction === "vertical"
        ? item.image.setPosition(this.x, imagePositionY)
        : item.image.setPosition(imagePositionX, this.y);

      // then we need to add the image to the container
      this.add(item.image);
    }
  }
}
