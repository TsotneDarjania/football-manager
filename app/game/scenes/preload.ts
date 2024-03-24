import { WebFontFile } from "../helper/webFontLoader";
import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.setPath(`../../game/assets/`);

    //Choacs
    this.load.image("guardiola-default", "image/coachs/guardiola-default.jpg");
    this.load.image("mourinho-default", "image/coachs/mourinho-default.jpg");

    //sound Effects
    this.load.audio("passSound", ["sounds/pass.mp3"]);
    this.load.audio("shootSound", ["sounds/shoot.mp3"]);
    this.load.audio("goalSelebrationSound", ["sounds/goalSelebration.mp3"]);
    this.load.audio("refereeSound", ["sounds/referee.mp3"]);
    this.load.audio("fansSound", ["sounds/fans.mp3"]);

    //Font
    // this.load.addFile(new WebFontFile(this.load, "Rubik Mono One"));
    this.load.addFile(new WebFontFile(this.load, "Silkscreen"));

    //UI
    this.load.image("arrow", "image/ui/arrow.png");
    this.load.image("menu-button", "image/ui/menu-button.png");
    this.load.image("default", "image/ui/default.png");
    this.load.image("circle", "image/ui/circle.png");
    this.load.image("grass", "image/ui/grass.jpg");
    this.load.image("menuIcon", "image/ui/menu-icon.png");
    this.load.image("stadiumFitch", "image/ui/fitch.png");
    this.load.image("menu-close", "image/ui/menu-close.png");
    this.load.image("tactics-stadium", "image/ui/tactics-stadium.png");
    this.load.image("fan", "image/ui/fan.png");
    this.load.image("stadium-surrounding", "image/ui/stadium-surrounding.png");
    this.load.image("triangle", "image/ui/triangle.png");
    this.load.image("roof", "image/ui/roof.jpg");
    this.load.image("city", "image/ui/city.jpg");

    // Nations
    this.load.image("algeria", "image/teamLogos/nations/Algeria.png");
    this.load.image("argentina", "image/teamLogos/nations/Argentina.png");
    this.load.image("australia", "image/teamLogos/nations/Australia.png");
    this.load.image("brazil", "image/teamLogos/nations/Brazil.png");
    this.load.image("cameroon", "image/teamLogos/nations/Cameroon.png");
    this.load.image("canada", "image/teamLogos/nations/Canada.png");
    this.load.image("chile", "image/teamLogos/nations/Chile.png");
    this.load.image("china", "image/teamLogos/nations/China.png");
    this.load.image("colombia", "image/teamLogos/nations/Colombia.png");
    this.load.image("ecuador", "image/teamLogos/nations/Ecuador.png");
    this.load.image("egypt", "image/teamLogos/nations/Egypt.png");
    this.load.image("ghana", "image/teamLogos/nations/Ghana.png");
    this.load.image("india", "image/teamLogos/nations/India.png");
    this.load.image("japan", "image/teamLogos/nations/Japan.png");
    this.load.image("mexico", "image/teamLogos/nations/Mexico.png");
    this.load.image("morocco", "image/teamLogos/nations/Morocco.png");
    this.load.image("nigeria", "image/teamLogos/nations/Nigeria.png");
    this.load.image("paraguay", "image/teamLogos/nations/Paraguay.png");
    this.load.image("peru", "image/teamLogos/nations/Peru.png");
    this.load.image("senegal", "image/teamLogos/nations/Senegal.png");
    this.load.image("south-africa", "image/teamLogos/nations/South-Africa.png");
    this.load.image("south-korea", "image/teamLogos/nations/South-Korea.png");
    this.load.image("uruguay", "image/teamLogos/nations/Uruguay.png");
    this.load.image("usa", "image/teamLogos/nations/USA.png");
    this.load.image("venezuela", "image/teamLogos/nations/Venezuela.png");

    // European Nations
    this.load.image("albania", "image/teamLogos/europeanNations/Albania.png");
    this.load.image("austria", "image/teamLogos/europeanNations/Austria.png");
    this.load.image("belgium", "image/teamLogos/europeanNations/Belgium.png");
    this.load.image("croatia", "image/teamLogos/europeanNations/Croatia.png");
    this.load.image(
      "czech-republic",
      "image/teamLogos/europeanNations/Czech-Republic.png"
    );
    this.load.image("denmark", "image/teamLogos/europeanNations/Denmark.png");
    this.load.image("england", "image/teamLogos/europeanNations/England.png");
    this.load.image("france", "image/teamLogos/europeanNations/France.png");
    this.load.image("georgia", "image/teamLogos/europeanNations/Georgia.png");
    this.load.image("germany", "image/teamLogos/europeanNations/Germany.png");
    this.load.image("greece", "image/teamLogos/europeanNations/Greece.png");
    this.load.image("hungary", "image/teamLogos/europeanNations/Hungary.png");
    this.load.image("italy", "image/teamLogos/europeanNations/Italy.png");
    this.load.image(
      "netherlands",
      "image/teamLogos/europeanNations/Netherlands.png"
    );
    this.load.image("norway", "image/teamLogos/europeanNations/Norway.png");
    this.load.image("portugal", "image/teamLogos/europeanNations/Portugal.png");
    this.load.image("romania", "image/teamLogos/europeanNations/Romania.png");
    this.load.image("scotland", "image/teamLogos/europeanNations/Scotland.png");
    this.load.image("serbia", "image/teamLogos/europeanNations/Serbia.png");
    this.load.image("slovakia", "image/teamLogos/europeanNations/Slovakia.png");
    this.load.image("slovenia", "image/teamLogos/europeanNations/Slovenia.png");
    this.load.image("spain", "image/teamLogos/europeanNations/Spain.png");
    this.load.image("sweden", "image/teamLogos/europeanNations/Sweden.png");
    this.load.image(
      "switzerland",
      "image/teamLogos/europeanNations/Switzerland.png"
    );
    this.load.image("turkey", "image/teamLogos/europeanNations/Turkey.png");

    //Other Europenas
    this.load.image("ajax", "image/teamLogos/otherEuropeans/Ajax.png");
    this.load.image(
      "bayer-leverkusen",
      "image/teamLogos/otherEuropeans/Bayer-Leverkusen.png"
    );
    this.load.image(
      "bayern-munich",
      "image/teamLogos/otherEuropeans/Bayern-Munich.png"
    );
    this.load.image("benfica", "image/teamLogos/otherEuropeans/Benfica.png");
    this.load.image("dortmund", "image/teamLogos/otherEuropeans/Dortmund.png");
    this.load.image(
      "fenerbahce",
      "image/teamLogos/otherEuropeans/Fenerbahce.png"
    );
    this.load.image("feynoord", "image/teamLogos/otherEuropeans/Feynoord.png");
    this.load.image(
      "galatasaray",
      "image/teamLogos/otherEuropeans/Galatasaray.png"
    );
    this.load.image("lille", "image/teamLogos/otherEuropeans/Lille.png");
    this.load.image("lyon", "image/teamLogos/otherEuropeans/Lyon.png");
    this.load.image(
      "marseille",
      "image/teamLogos/otherEuropeans/Marseille.png"
    );
    this.load.image("monaco", "image/teamLogos/otherEuropeans/Monaco.png");
    this.load.image("nice", "image/teamLogos/otherEuropeans/Nice.png");
    this.load.image("porto", "image/teamLogos/otherEuropeans/Porto.png");
    this.load.image("psg", "image/teamLogos/otherEuropeans/PSG.png");
    this.load.image("psv", "image/teamLogos/otherEuropeans/PSV.png");
    this.load.image(
      "rb-leipzig",
      "image/teamLogos/otherEuropeans/RB-Leipzig.png"
    );
    this.load.image("sporting", "image/teamLogos/otherEuropeans/Sporting.png");
    this.load.image(
      "stuttgart",
      "image/teamLogos/otherEuropeans/Stuttgart.png"
    );
    this.load.image("twente", "image/teamLogos/otherEuropeans/Twente.png");

    //Rest Of The World
    this.load.image("al-hilal", "image/teamLogos/restOfTheWorld/Al-Hilal.png");
    this.load.image(
      "al-ittihad",
      "image/teamLogos/restOfTheWorld/Al-Ittihad.png"
    );
    this.load.image("al-nassr", "image/teamLogos/restOfTheWorld/Al-Nassr.png");
    this.load.image(
      "boca-juniors",
      "image/teamLogos/restOfTheWorld/Boca-Juniors.png"
    );
    this.load.image("flamengo", "image/teamLogos/restOfTheWorld/Flamengo.png");
    this.load.image(
      "fluminense",
      "image/teamLogos/restOfTheWorld/Fluminense.png"
    );
    this.load.image("gremio", "image/teamLogos/restOfTheWorld/Gremio.png");
    this.load.image(
      "inter-miami",
      "image/teamLogos/restOfTheWorld/Inter-Miami.png"
    );
    this.load.image(
      "la-galaxy",
      "image/teamLogos/restOfTheWorld/LA-Galaxy.png"
    );
    this.load.image(
      "new-york-city",
      "image/teamLogos/restOfTheWorld/New-York-City.png"
    );
    this.load.image(
      "palmeiras",
      "image/teamLogos/restOfTheWorld/Palmeiras.png"
    );
    this.load.image("Racing", "image/teamLogos/restOfTheWorld/Racing.png");
    this.load.image(
      "river-plate",
      "image/teamLogos/restOfTheWorld/River-Plate.png"
    );
    this.load.image("Santos", "image/teamLogos/restOfTheWorld/Santos.png");
    this.load.image(
      "sao-paulo",
      "image/teamLogos/restOfTheWorld/Sao-Paulo.png"
    );
    this.load.image(
      "changhai-port",
      "image/teamLogos/restOfTheWorld/Shanghai-Port.png"
    );

    // Erovnuli Liga
    this.load.image("bolnisi", "image/teamLogos/erovnuliLiga/Bolnisi.png");
    this.load.image("dila-gori", "image/teamLogos/erovnuliLiga/Dila-Gori.png");
    this.load.image(
      "dinamo-tbilisi",
      "image/teamLogos/erovnuliLiga/Dinamo-Tbilisi.png"
    );
    this.load.image("poti", "image/teamLogos/erovnuliLiga/Poti.png");
    this.load.image("saburtalo", "image/teamLogos/erovnuliLiga/Saburtalo.png");
    this.load.image("samgurali", "image/teamLogos/erovnuliLiga/Samgurali.png");
    this.load.image("shukura", "image/teamLogos/erovnuliLiga/Shukura.png");
    this.load.image(
      "torpedo-kutaisi",
      "image/teamLogos/erovnuliLiga/Torpedo-Kutaisi.png"
    );
    this.load.image(
      "wit-georgia",
      "image/teamLogos/erovnuliLiga/WIT-Georgia.png"
    );

    // La Liga
    this.load.image("alaves", "image/teamLogos/laLiga/Alaves.png");
    this.load.image("almeria", "image/teamLogos/laLiga/Almeria.png");
    this.load.image(
      "athletic-bilbao",
      "image/teamLogos/laLiga/Athletic-Bilbao.png"
    );
    this.load.image(
      "atletico-madrid",
      "image/teamLogos/laLiga/Atletico-Madrid.png"
    );
    this.load.image("barcelona", "image/teamLogos/laLiga/Barcelona.png");
    this.load.image("betis", "image/teamLogos/laLiga/Betis.png");
    this.load.image("cadiz", "image/teamLogos/laLiga/Cadiz.png");
    this.load.image("celta", "image/teamLogos/laLiga/Celta-Vigo.png");
    this.load.image("getafe", "image/teamLogos/laLiga/Getafe.png");
    this.load.image("girona", "image/teamLogos/laLiga/Girona.png");
    this.load.image("granada", "image/teamLogos/laLiga/Granada.png");
    this.load.image("las-palmas", "image/teamLogos/laLiga/Las-Palmas.png");
    this.load.image("mallorca", "image/teamLogos/laLiga/Mallorca.png");
    this.load.image("osasuna", "image/teamLogos/laLiga/Osasuna.png");
    this.load.image(
      "rayo-vallecano",
      "image/teamLogos/laLiga/Rayo-Vallecano.png"
    );
    this.load.image("real-madrid", "image/teamLogos/laLiga/Real-Madrid.png");
    this.load.image(
      "real-sociedad",
      "image/teamLogos/laLiga/Real-Sociedad.png"
    );
    this.load.image("sevilla", "image/teamLogos/laLiga/Sevilla.png");
    this.load.image("valencia", "image/teamLogos/laLiga/Valencia.png");
    this.load.image("villarreal", "image/teamLogos/laLiga/Villarreal.png");

    //Seria A
    this.load.image("atalanta", "image/teamLogos/seriaA/Atalanta.png");
    this.load.image("bologna", "image/teamLogos/seriaA/Bologna.png");
    this.load.image("cagliari", "image/teamLogos/seriaA/Cagliari.png");
    this.load.image("empoli", "image/teamLogos/seriaA/Empoli.png");
    this.load.image("fiorentina", "image/teamLogos/seriaA/Fiorentina.png");
    this.load.image("frosinone", "image/teamLogos/seriaA/Frosinone.png");
    this.load.image("genoa", "image/teamLogos/seriaA/Genoa.png");
    this.load.image("inter", "image/teamLogos/seriaA/Inter.png");
    this.load.image("juventus", "image/teamLogos/seriaA/Juventus.png");
    this.load.image("lazio", "image/teamLogos/seriaA/Lazio.png");
    this.load.image("lecce", "image/teamLogos/seriaA/Lecce.png");
    this.load.image("milan", "image/teamLogos/seriaA/Milan.png");
    this.load.image("monza", "image/teamLogos/seriaA/Monza.png");
    this.load.image("napoli", "image/teamLogos/seriaA/Napoli.png");
    this.load.image("roma", "image/teamLogos/seriaA/Roma.png");
    this.load.image("salernitana", "image/teamLogos/seriaA/Salernitana.png");
    this.load.image("sassuolo", "image/teamLogos/seriaA/Sassuolo.png");
    this.load.image("torino", "image/teamLogos/seriaA/Torino.png");
    this.load.image("udinese", "image/teamLogos/seriaA/Udinese.png");
    this.load.image("verona", "image/teamLogos/seriaA/Verona.png");

    //Premier League
    this.load.image("arsenal", "image/teamLogos/premierLeague/Arsenal.png");
    this.load.image(
      "aston-villa",
      "image/teamLogos/premierLeague/Aston-Villa.png"
    );
    this.load.image(
      "bournemouth",
      "image/teamLogos/premierLeague/Bournemouth.png"
    );
    this.load.image("brentford", "image/teamLogos/premierLeague/Brentford.png");
    this.load.image("brighton", "image/teamLogos/premierLeague/Brighton.png");
    this.load.image("burnley", "image/teamLogos/premierLeague/Burnley.png");
    this.load.image("chelsea", "image/teamLogos/premierLeague/Chelsea.png");
    this.load.image(
      "crystal-palace",
      "image/teamLogos/premierLeague/Crystal-Palace.png"
    );
    this.load.image("everton", "image/teamLogos/premierLeague/Everton.png");
    this.load.image("fulham", "image/teamLogos/premierLeague/Fulham.png");
    this.load.image("liverpool", "image/teamLogos/premierLeague/Liverpool.png");
    this.load.image("luton", "image/teamLogos/premierLeague/Luton.png");
    this.load.image(
      "manchester-city",
      "image/teamLogos/premierLeague/Manchester-City.png"
    );
    this.load.image(
      "manchester-united",
      "image/teamLogos/premierLeague/Manchester-United.png"
    );
    this.load.image("newcastle", "image/teamLogos/premierLeague/Newcastle.png");
    this.load.image(
      "nottingham",
      "image/teamLogos/premierLeague/Nottingham.png"
    );
    this.load.image("sheffield", "image/teamLogos/premierLeague/Sheffield.png");
    this.load.image("tottenham", "image/teamLogos/premierLeague/Tottenham.png");
    this.load.image("west-ham", "image/teamLogos/premierLeague/West-Ham.png");
    this.load.image("wolves", "image/teamLogos/premierLeague/Wolves.png");

    //Tournaments
    this.load.image(
      "georgian-league",
      "image/teamLogos/tournaments/Erovnuli-liga.png"
    );
    this.load.image("la-liga", "image/teamLogos/tournaments/LaLiga.png");
    this.load.image(
      "other-european",
      "image/teamLogos/tournaments/Other-European.png"
    );
    this.load.image("european", "image/teamLogos/tournaments/european.png");
    this.load.image(
      "other-european-nations",
      "image/teamLogos/tournaments/other-european-nations.png"
    );
    this.load.image(
      "premier-league",
      "image/teamLogos/tournaments/Premier-League.png"
    );
    this.load.image(
      "rest-of-the-world",
      "image/teamLogos/tournaments/Restofthe-World.png"
    );
    this.load.image("seria-A", "image/teamLogos/tournaments/Seria-A.png");

    //GameObjects
    this.load.image("ball", "image/gameObjects/ball.png");
    this.load.image("elipse", "image/gameObjects/elipse.png");
    this.load.image("ground", "image/gameObjects/ground.jpg");
    this.load.image(
      "stadiumSurrounding",
      "image/gameObjects/stadiumSurrounding.jpg"
    );
  }

  create() {
    // this.scene.start("Menu");
    this.scene.start("GamePlay");
  }
}
