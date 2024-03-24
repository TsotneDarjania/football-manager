import { MenuButton } from "../ui/menuButton";
import { Selector } from "../ui/selector";
import { TeamData, initialTeamsData } from "@/app/config/initialTeamsData";
import { calculatePercentage } from "@/app/utils/math";
import { SettingsModal } from "../ui/components/menuModal/settingsModal";
import { TacticsModal } from "../ui/components/menuModal/tacticsModal";
import { deepCopy } from "@/app/utils/helperFunctions";
import { matchData } from "@/app/config/matchData";

export default class Menu extends Phaser.Scene {
  hostTeamsSelector!: Selector;
  guestTeamsSelector!: Selector;

  leftTournamentSelector!: Selector;
  rightTournamentSelector!: Selector;

  hostTeamText!: Phaser.GameObjects.Text;
  guestTeamText!: Phaser.GameObjects.Text;

  settingsModal!: SettingsModal;
  tacticsModal!: TacticsModal;

  settingsButton!: MenuButton;
  startButton!: MenuButton;
  tacticsButton!: MenuButton;

  selectedHostTeam!: TeamData;
  selectedGuestTeam!: TeamData;

  backgroundAniamtionEffectImage!: Phaser.GameObjects.Image;

  constructor() {
    super("Menu");
  }

  create() {
    this.scale.on(Phaser.Scale.Events.RESIZE, () => {
      this.scale.removeAllListeners();
      setTimeout(() => {
        this.scale.resize(this.game.canvas.width, this.game.canvas.height);
        this.renderer.resize(this.game.canvas.width, this.game.canvas.height);

        this.scene.restart();
      }, 1000);
    });

    this.addUI();
    this.updateSelectedTeams();

    this.events.on("rotate", () => {
      this.updateSelectedTeams();
    });

    this.addAnimationEffectImage();
  }

  addAnimationEffectImage() {
    this.backgroundAniamtionEffectImage = this.add
      .image(0, 0, "default")
      .setOrigin(0)
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height)
      .setVisible(false)
      .setAlpha(0)
      .setDepth(100);
  }

  updateSelectedTeams() {
    this.selectedHostTeam =
      initialTeamsData[this.hostTeamsSelector.selectedItem.name];
    this.selectedGuestTeam =
      initialTeamsData[this.guestTeamsSelector.selectedItem.name];

    this.updateTeams(
      this.hostTeamsSelector.selectedItem.name,
      this.guestTeamsSelector.selectedItem.name
    );
  }

  addUI() {
    this.addBackground();
    this.addTexts();
    this.addButtons();
    this.addTeamSelectors();

    this.settingsModal = new SettingsModal(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    )
      .setDepth(10)
      .setVisible(false);

    this.tacticsModal = new TacticsModal(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height / 2
    )
      .setDepth(10)
      .setVisible(false);
  }

  addTeamSelectors() {
    // Prepare Data
    const leftTeamLogos = this.add.group();
    const leftTeamsSelectorData = Object.entries(initialTeamsData).map(
      ([name, data]) => {
        return {
          image: leftTeamLogos.get(0, 0, data.logoKey, undefined, false),
          name: name,
        };
      }
    );
    const rightTeamLogos = this.add.group();
    const rightTeamsSelectorData = Object.entries(initialTeamsData).map(
      ([name, data]) => {
        return {
          image: rightTeamLogos.get(0, 0, data.logoKey, undefined, false),
          name: name,
        };
      }
    );
    // Host Teams Selector
    this.hostTeamsSelector = new Selector(
      this,
      0,
      0,
      leftTeamsSelectorData,
      calculatePercentage(5, this.game.canvas.height),
      "vertical",
      "Juventus"
    );
    matchData.hostTeam = deepCopy<TeamData>(initialTeamsData["Juventus"]);

    this.hostTeamsSelector.setPosition(
      60,
      this.game.canvas.height / 2 -
        this.hostTeamsSelector.getBounds().height / 1.3
    );

    // Right Teams Selector
    this.guestTeamsSelector = new Selector(
      this,
      0,
      0,
      rightTeamsSelectorData,
      calculatePercentage(5, this.game.canvas.height),
      "vertical",
      "Liverpool"
    );
    matchData.guestTeam = deepCopy<TeamData>(initialTeamsData["Liverpool"]);

    this.guestTeamsSelector.setPosition(
      this.game.canvas.width - 60,
      this.game.canvas.height / 2 -
        this.guestTeamsSelector.getBounds().height / 1.3
    );
  }

  addBackground() {
    this.add
      .rectangle(
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height,
        0x08170f
      )
      .setOrigin(0);
  }

  updateTeams(hostTeamName: string, guestTeamName: string) {
    this.hostTeamText.setText(hostTeamName);
    this.guestTeamText.setText(guestTeamName);
  }

  addTexts() {
    // VS text
    this.add
      .text(this.game.canvas.width / 2, this.game.canvas.height / 2, "VS", {
        fontFamily: "Silkscreen",
        fontSize: calculatePercentage(2.5, this.game.canvas.width),
        color: "#6CFFFA",
      })
      .setOrigin(0.5);

    //Host team name
    this.hostTeamText = this.add
      .text(
        this.game.canvas.width / 2 -
          calculatePercentage(4, this.game.canvas.width),
        this.game.canvas.height / 2,
        "",
        {
          fontFamily: "Silkscreen",
          fontSize: calculatePercentage(1.6, this.game.canvas.width),
          color: "#C0FFFA",
        }
      )
      .setOrigin(1, 0.5);

    //Guest team name
    this.guestTeamText = this.add
      .text(
        this.game.canvas.width / 2 +
          calculatePercentage(4, this.game.canvas.width),
        this.game.canvas.height / 2,
        "",
        {
          fontFamily: "Silkscreen",
          fontSize: calculatePercentage(1.6, this.game.canvas.width),
          color: "#C0FFFA",
        }
      )
      .setOrigin(0, 0.5);
  }

  addButtons() {
    // Start Button
    this.startButton = new MenuButton(
      this,
      this.game.canvas.width / 2,
      this.game.canvas.height - 30,
      calculatePercentage(20, this.game.canvas.width),

      "Start Match",
      0x6cff81,
      "#6CFF81",
      calculatePercentage(2.2, this.game.canvas.width)
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.backgroundAniamtionEffectImage.setVisible(true);
        this.tacticsButton.setVisible(false);
        this.settingsButton.setVisible(false);
        this.startButton.setVisible(false);

        this.add.tween({
          targets: this.backgroundAniamtionEffectImage,
          alpha: 1,
          duration: 2500,
          onComplete: () => {
            this.scene.start("GamePlay");
          },
        });
      });

    // Tactic Button
    this.tacticsButton = new MenuButton(
      this,
      this.game.canvas.width / 2 -
        calculatePercentage(12, this.game.canvas.width),
      this.game.canvas.height - 30,
      calculatePercentage(10, this.game.canvas.width),
      "Tactics",
      0xc0fffa,
      "#C0FFFA",
      calculatePercentage(1.8, this.game.canvas.width)
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.tacticsModal.setVisible(true);
        this.tacticsModal.setTeams(
          this.selectedHostTeam,
          this.selectedGuestTeam
        );

        this.settingsButton.setVisible(false);
        this.startButton.setVisible(false);
        this.tacticsButton.setVisible(false);
      });

    //Settings Button
    this.settingsButton = new MenuButton(
      this,
      this.game.canvas.width / 2 +
        calculatePercentage(12, this.game.canvas.width),
      this.game.canvas.height - 30,
      calculatePercentage(10, this.game.canvas.width),
      "Settings",
      0xc0fffa,
      "#C0FFFA",
      calculatePercentage(1.8, this.game.canvas.width)
    )
      .setInteractive()
      .on(Phaser.Input.Events.POINTER_DOWN, () => {
        this.settingsModal.setVisible(true);
        this.settingsButton.setVisible(false);
        this.startButton.setVisible(false);
        this.tacticsButton.setVisible(false);
      });
  }
}
