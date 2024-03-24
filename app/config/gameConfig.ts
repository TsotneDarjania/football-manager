export const gameConfig: GameConfig = {
  formations: ["4-3-3", "4-4-2", "5-3-2", "3-5-2", "3-4-3"],
  formationProperties: {
    defence: ["wide-attack", "normal"],
    midfield: [
      "wide-attack",
      "center-attack",
      "center-deffence",
      "wide-deffence",
      "normal",
    ],
    attack: ["center-attack", "normal"],
  },
};

type GameConfig = {
  formations: string[];
  formationProperties: {
    defence: string[];
    midfield: string[];
    attack: string[];
  };
};
