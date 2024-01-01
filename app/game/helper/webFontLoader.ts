import Phaser from "phaser";
import WebFontLoader from "webfontloader";

export class WebFontFile extends Phaser.Loader.File {
  fontNames: string[];
  service: string;

  /**
   * @param {Phaser.Loader.LoaderPlugin} loader
   * @param {string | string[]} fontNames
   * @param {string} [service]
   */
  constructor(
    loader: Phaser.Loader.LoaderPlugin,
    fontNames: string | string[],
    service: string = "google"
  ) {
    super(loader, {
      type: "webfont",
      key: Array.isArray(fontNames) ? fontNames.toString() : fontNames,
    });
    this.fontNames = Array.isArray(fontNames) ? fontNames : [fontNames];
    this.service = service;
  }

  load() {
    const config: WebFontLoader.Config = {
      active: () => {
        this.loader.nextFile(this, true);
      },
    };
    switch (this.service) {
      case "google":
        config.google = {
          families: this.fontNames,
        };
        break;
      default:
        throw new Error("Unsupported font service");
    }
    WebFontLoader.load(config);
  }
}
