import { gameConfig } from "@/app/config/gameConfig";
import { TeamData } from "@/app/config/initialTeamsData";
import { calculatePercentage } from "@/app/utils/math";
import { SimpleSelector } from "../../../simpleSelector";
import { OptionsBar } from "../../../../optionsBar";
import { matchData } from "@/app/config/matchData";
import { deepCopy } from "@/app/utils/helperFunctions";

export class SimpleModeWindow extends Phaser.GameObjects.Container {
  stadium!: Phaser.GameObjects.Image;
  formationIndex = 0;

  defenceColumn!: Phaser.GameObjects.Container;
  centerColumn!: Phaser.GameObjects.Container;
  attackColumn!: Phaser.GameObjects.Container;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    public side: string,
    public team: TeamData,
    public modeButtons: Phaser.GameObjects.Container
  ) {
    super(scene, x, y);
    scene.add.existing(this);

    this.init();
  }

  init() {
    this.formationIndex = gameConfig.formations.indexOf(this.team.formation);

    if (this.side === "left") {
      if (matchData.hostTeam.name !== this.team.name)
        matchData.hostTeam = deepCopy<TeamData>(this.team);
    } else {
      if (matchData.guestTeam.name !== this.team.name)
        matchData.guestTeam = deepCopy<TeamData>(this.team);
    }

    this.addTitle();
    this.addBackButton();
    this.addStadium();
    this.addFormation();
    this.addFormationPropertiesChangeSelectors();
    this.addStrengthSelector();
  }

  addTitle() {
    const formationTitle = this.scene.add
      .text(
        this.side === "left"
          ? calculatePercentage(-25, this.scene.game.canvas.width)
          : calculatePercentage(25, this.scene.game.canvas.width),
        calculatePercentage(-40, this.scene.game.canvas.height),
        "Formation",
        {
          fontFamily: "Rubik Mono One",
          fontSize: "14px",
          color: "#ffffff",
          align: "center",
        }
      )
      .setOrigin(0.5);
    this.add(formationTitle);
  }

  addBackButton() {
    const backButtton = this.scene.add
      .image(
        this.side === "left"
          ? -calculatePercentage(48, this.scene.game.canvas.width)
          : calculatePercentage(48, this.scene.game.canvas.width),
        0,
        "arrow"
      )
      .setFlipX(this.side === "right")
      .setDisplaySize(40, 40)
      .setInteractive({ cursor: "pointer" })
      .on("pointerdown", () => {
        this.destroy();
        this.modeButtons.setVisible(true);
      });
    this.add(backButtton);
  }

  addStadium() {
    this.stadium = this.scene.add
      .image(
        this.side === "left"
          ? -calculatePercentage(25, this.scene.game.canvas.width)
          : calculatePercentage(25, this.scene.game.canvas.width),
        -calculatePercentage(20, this.scene.game.canvas.height),
        "tactics-stadium"
      )
      .setAlpha(0.5)
      .setDisplaySize(
        calculatePercentage(35, this.scene.game.canvas.width),
        calculatePercentage(30, this.scene.game.canvas.height)
      );
    this.add(this.stadium);
  }

  //i think that i need better name for this fucking function
  addFormationPropertiesChangeSelectors() {
    // Defence
    const defenceSelector = new SimpleSelector(
      this.scene,
      this.stadium.x,
      calculatePercentage(5, this.scene.game.canvas.height),
      gameConfig.formationProperties.defence,
      this.side === "left"
        ? matchData.hostTeam.formationProperties.defence
        : matchData.guestTeam.formationProperties.defence,
      (value: string) => {
        if (this.side === "left") {
          matchData.hostTeam.formationProperties.defence =
            value as typeof this.team.formationProperties.defence;
        } else {
          matchData.guestTeam.formationProperties.defence =
            value as typeof this.team.formationProperties.defence;
        }

        this.defenceColumn.destroy();
        this.centerColumn.destroy();
        this.attackColumn.destroy();

        this.addFormation();
      },
      "Defence"
    ).setScale(0.7);
    this.add(defenceSelector);

    // Center
    const centerSelector = new SimpleSelector(
      this.scene,
      this.stadium.x,
      calculatePercentage(15, this.scene.game.canvas.height),
      gameConfig.formationProperties.midfield,
      this.side === "left"
        ? matchData.hostTeam.formationProperties.midfield
        : matchData.guestTeam.formationProperties.midfield,
      (value: string) => {
        if (this.side === "left") {
          matchData.hostTeam.formationProperties.midfield =
            value as typeof this.team.formationProperties.midfield;
        } else {
          matchData.guestTeam.formationProperties.midfield =
            value as typeof this.team.formationProperties.midfield;
        }

        this.defenceColumn.destroy();
        this.centerColumn.destroy();
        this.attackColumn.destroy();

        this.addFormation();
      },
      "midfield"
    ).setScale(0.7);
    this.add(centerSelector);

    // Attack
    const attackSelector = new SimpleSelector(
      this.scene,
      this.stadium.x,
      calculatePercentage(25, this.scene.game.canvas.height),
      gameConfig.formationProperties.attack,
      this.side === "left"
        ? matchData.hostTeam.formationProperties.attack
        : matchData.guestTeam.formationProperties.attack,
      (value: string) => {
        if (this.side === "left") {
          matchData.hostTeam.formationProperties.attack =
            value as typeof this.team.formationProperties.attack;
        } else {
          matchData.guestTeam.formationProperties.attack =
            value as typeof this.team.formationProperties.attack;
        }

        this.defenceColumn.destroy();
        this.centerColumn.destroy();
        this.attackColumn.destroy();

        this.addFormation();
      },
      "Attack"
    ).setScale(0.7);
    this.add(attackSelector);
  }

  addStrengthSelector() {
    const strengthBar = new OptionsBar(
      this.scene,
      0,
      0,
      calculatePercentage(30, this.scene.game.canvas.width),
      "Strength",
      this.side === "left" ? matchData.hostTeam : matchData.guestTeam
    );
    strengthBar.setPosition(
      this.stadium.x - calculatePercentage(0, strengthBar.getBounds().width),
      calculatePercentage(36, this.scene.game.canvas.height)
    );
    this.add(strengthBar);
  }

  addFormation() {
    // Add Defence Column
    this.defenceColumn = this.scene.add.container(
      this.stadium.x - calculatePercentage(35, this.stadium.getBounds().width),
      0
    );

    const defenceQuantity =
      this.side === "left"
        ? Number(matchData.hostTeam.formation.split("-")[0])
        : Number(matchData.guestTeam.formation.split("-")[0]);
    for (let i = 0; i < defenceQuantity; i++) {
      let posX = 0;
      if (i === 0 || i === defenceQuantity - 1) {
        if (
          this.side === "left"
            ? matchData.hostTeam.formationProperties.defence === "wide-attack"
            : matchData.guestTeam.formationProperties.defence === "wide-attack"
        ) {
          posX = calculatePercentage(4, this.stadium.width);
        }
      }

      const player = this.scene.add
        .image(
          posX,
          i * calculatePercentage(4, this.scene.game.canvas.height),
          this.team.logoKey
        )
        .setAlpha(0.8)
        .setDisplaySize(
          calculatePercentage(3, this.scene.game.canvas.height),
          calculatePercentage(3, this.scene.game.canvas.height)
        );
      this.scene.tweens.add({
        targets: player,
        alpha: 0.5,
        duration: 150,
        yoyo: true,
        repeat: -1,
      });
      this.defenceColumn.add(player);
    }

    this.defenceColumn.setPosition(
      this.defenceColumn.x,
      this.stadium.y -
        this.defenceColumn.getBounds().height / 2 +
        calculatePercentage(1.5, this.scene.game.canvas.height)
    );
    this.add(this.defenceColumn);

    // Add Center Column
    this.centerColumn = this.scene.add.container(
      this.stadium.x - calculatePercentage(5, this.stadium.getBounds().width),
      0
    );

    const centerQuantity =
      this.side === "left"
        ? Number(matchData.hostTeam.formation.split("-")[1])
        : Number(matchData.guestTeam.formation.split("-")[1]);
    for (let i = 0; i < centerQuantity; i++) {
      let posX = 0;
      if (i === 0 || i === centerQuantity - 1) {
        if (
          this.side === "left"
            ? matchData.hostTeam.formationProperties.midfield === "wide-attack"
            : matchData.guestTeam.formationProperties.midfield === "wide-attack"
        ) {
          posX = calculatePercentage(4, this.stadium.width);
        }
        if (
          this.side === "left"
            ? matchData.hostTeam.formationProperties.midfield ===
              "wide-deffence"
            : matchData.guestTeam.formationProperties.midfield ===
              "wide-deffence"
        ) {
          posX = -calculatePercentage(4, this.stadium.width);
        }
      } else {
        if (
          this.side === "left"
            ? matchData.hostTeam.formationProperties.midfield ===
              "center-attack"
            : matchData.guestTeam.formationProperties.midfield ===
              "center-attack"
        ) {
          posX = calculatePercentage(4, this.stadium.width);
        }
        if (
          this.side === "left"
            ? matchData.hostTeam.formationProperties.midfield ===
              "center-deffence"
            : matchData.guestTeam.formationProperties.midfield ===
              "center-deffence"
        ) {
          posX = -calculatePercentage(4, this.stadium.width);
        }
      }

      const player = this.scene.add
        .image(
          posX,
          i * calculatePercentage(4, this.scene.game.canvas.height),
          this.team.logoKey
        )
        .setAlpha(0.8)
        .setDisplaySize(
          calculatePercentage(3, this.scene.game.canvas.height),
          calculatePercentage(3, this.scene.game.canvas.height)
        );
      this.scene.tweens.add({
        targets: player,
        alpha: 0.5,
        duration: 150,
        yoyo: true,
        repeat: -1,
      });
      this.centerColumn.add(player);
    }

    this.centerColumn.setPosition(
      this.centerColumn.x,
      this.stadium.y -
        this.centerColumn.getBounds().height / 2 +
        calculatePercentage(1.5, this.scene.game.canvas.height)
    );
    this.add(this.centerColumn);

    // Add Attack Column
    this.attackColumn = this.scene.add.container(
      this.stadium.x + calculatePercentage(25, this.stadium.getBounds().width),
      0
    );

    const attackQuantity =
      this.side === "left"
        ? Number(matchData.hostTeam.formation.split("-")[2])
        : Number(matchData.guestTeam.formation.split("-")[2]);
    for (let i = 0; i < attackQuantity; i++) {
      let posX = 0;
      if (attackQuantity > 2) {
        if (i !== 0 && i !== attackQuantity - 1) {
          if (
            this.side === "left"
              ? matchData.hostTeam.formationProperties.attack ===
                "center-attack"
              : matchData.guestTeam.formationProperties.attack ===
                "center-attack"
          ) {
            posX = calculatePercentage(4, this.stadium.width);
          }
        }
      }

      const player = this.scene.add
        .image(
          posX,
          i * calculatePercentage(4, this.scene.game.canvas.height),
          this.team.logoKey
        )
        .setAlpha(0.8)
        .setDisplaySize(
          calculatePercentage(3, this.scene.game.canvas.height),
          calculatePercentage(3, this.scene.game.canvas.height)
        );
      this.scene.tweens.add({
        targets: player,
        alpha: 0.5,
        duration: 150,
        yoyo: true,
        repeat: -1,
      });
      this.attackColumn.add(player);
    }

    this.attackColumn.setPosition(
      this.attackColumn.x,
      this.stadium.y -
        this.attackColumn.getBounds().height / 2 +
        calculatePercentage(1.5, this.scene.game.canvas.height)
    );
    this.add(this.attackColumn);

    // Left Arrow Button
    const leftArrow = this.scene.add
      .image(
        this.stadium.x -
          this.stadium.getBounds().width / 2 -
          calculatePercentage(2, this.scene.game.canvas.width),
        this.stadium.y,
        "arrow"
      )
      .setDisplaySize(40, 40)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.defenceColumn.destroy();
        this.centerColumn.destroy();
        this.attackColumn.destroy();

        this.formationIndex =
          this.formationIndex - 1 < 0
            ? gameConfig.formations.length - 1
            : this.formationIndex - 1;
        this.side === "left"
          ? (matchData.hostTeam.formation =
              gameConfig.formations[this.formationIndex])
          : (matchData.guestTeam.formation =
              gameConfig.formations[this.formationIndex]);

        this.addFormation();
      });
    this.add(leftArrow);

    // Left Arrow Button
    const rightArrow = this.scene.add
      .image(
        this.stadium.x +
          this.stadium.getBounds().width / 2 +
          calculatePercentage(2, this.scene.game.canvas.width),
        this.stadium.y,
        "arrow"
      )
      .setFlipX(true)
      .setDisplaySize(40, 40)
      .setInteractive({ cursor: "pointer" })
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.defenceColumn.destroy();
        this.centerColumn.destroy();
        this.attackColumn.destroy();

        this.formationIndex =
          (this.formationIndex + 1) % gameConfig.formations.length;
        this.side === "left"
          ? (matchData.hostTeam.formation =
              gameConfig.formations[this.formationIndex])
          : (matchData.guestTeam.formation =
              gameConfig.formations[this.formationIndex]);

        this.addFormation();
      });
    this.add(rightArrow);
  }
}
