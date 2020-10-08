export const apiRoute = ".api.riotgames.com";
export const summonerDataRoute = "/lol/summoner/v4/summoners/by-name/"; // + summoner name
export const champMasteryRoute =
  "/lol/champion-mastery/v4/champion-masteries/by-summoner/"; // + encrypted summoner id
export const summonerLeaguesRoute = "/lol/league/v4/entries/by-summoner/"; // + encrypted summoner id
export const champRotationRoute = "/lol/platform/v3/champion-rotations";

/**
 * Returns the actual server name for the specified region
 * @param region The name of the region
 */
export function checkRegion(region: string): string {
  switch (region.toLowerCase()) {
    case "eune":
      return "eun1";
    case "euw":
      return "euw1";
    case "kr":
      return "kr";
    case "na":
      return "na1";
    default:
      return "";
  }
}

const maxReqMin = 50;
var availableReqs = maxReqMin;
var lastResetTime: number = 0;

/**
 * Checks if the API limits have not been exceeded. If they are not,
 * update the sent request number.
 */
export function checkApiLimit(): boolean {
  const currentTime = new Date().getTime();
  if (currentTime - lastResetTime >= 60000) {
    availableReqs = maxReqMin;
    lastResetTime = currentTime;
  }

  if (availableReqs > 0) {
    availableReqs -= 1;
    return true;
  } else {
    return false;
  }
}

/**
 * Returns the actual name of a champion
 * @param id The id of the champion
 */
export function getChampName(id: number): string {
  const champs = [
    { key: 266, value: "Aatrox" },
    { key: 412, value: "Thresh" },
    { key: 23, value: "Tryndamere" },
    { key: 79, value: "Gragas" },
    { key: 69, value: "Cassiopeia" },
    { key: 136, value: "Aurelion Sol" },
    { key: 13, value: "Ryze" },
    { key: 78, value: "Poppy" },
    { key: 14, value: "Sion" },
    { key: 1, value: "Annie" },
    { key: 202, value: "Jhin" },
    { key: 43, value: "Karma" },
    { key: 111, value: "Nautilus" },
    { key: 240, value: "Kled" },
    { key: 99, value: "Lux" },
    { key: 103, value: "Ahri" },
    { key: 2, value: "Olaf" },
    { key: 112, value: "Viktor" },
    { key: 34, value: "Anivia" },
    { key: 27, value: "Singed" },
    { key: 86, value: "Garen" },
    { key: 127, value: "Lissandra" },
    { key: 57, value: "Maokai" },
    { key: 25, value: "Morgana" },
    { key: 28, value: "Evelynn" },
    { key: 105, value: "Fizz" },
    { key: 74, value: "Heimerdinger" },
    { key: 238, value: "Zed" },
    { key: 68, value: "Rumble" },
    { key: 82, value: "Mordekaiser" },
    { key: 37, value: "Sona" },
    { key: 96, value: "Kog'Maw" },
    { key: 55, value: "Katarina" },
    { key: 117, value: "Lulu" },
    { key: 22, value: "Ashe" },
    { key: 30, value: "Karthus" },
    { key: 12, value: "Alistar" },
    { key: 122, value: "Darius" },
    { key: 67, value: "Vayne" },
    { key: 110, value: "Varus" },
    { key: 77, value: "Udyr" },
    { key: 89, value: "Leona" },
    { key: 126, value: "Jayce" },
    { key: 134, value: "Syndra" },
    { key: 80, value: "Pantheon" },
    { key: 92, value: "Riven" },
    { key: 121, value: "Kha'Zix" },
    { key: 42, value: "Corki" },
    { key: 268, value: "Azir" },
    { key: 51, value: "Caitlyn" },
    { key: 76, value: "Nidalee" },
    { key: 85, value: "Kennen" },
    { key: 3, value: "Galio" },
    { key: 45, value: "Veigar" },
    { key: 432, value: "Bard" },
    { key: 150, value: "Gnar" },
    { key: 90, value: "Malzahar" },
    { key: 104, value: "Graves" },
    { key: 254, value: "Vi" },
    { key: 10, value: "Kayle" },
    { key: 39, value: "Irelia" },
    { key: 64, value: "Lee Sin" },
    { key: 420, value: "Illaoi" },
    { key: 60, value: "Elise" },
    { key: 106, value: "Volibear" },
    { key: 20, value: "Nunu" },
    { key: 4, value: "Twisted Fate" },
    { key: 24, value: "Jax" },
    { key: 102, value: "Shyvana" },
    { key: 429, value: "Kalista" },
    { key: 36, value: "Dr. Mundo" },
    { key: 427, value: "Ivern" },
    { key: 131, value: "Diana" },
    { key: 223, value: "Tahm Kench" },
    { key: 63, value: "Brand" },
    { key: 113, value: "Sejuani" },
    { key: 8, value: "Vladimir" },
    { key: 154, value: "Zac" },
    { key: 421, value: "Rek'Sai" },
    { key: 133, value: "Quinn" },
    { key: 84, value: "Akali" },
    { key: 163, value: "Taliyah" },
    { key: 18, value: "Tristana" },
    { key: 120, value: "Hecarim" },
    { key: 15, value: "Sivir" },
    { key: 236, value: "Lucian" },
    { key: 107, value: "Rengar" },
    { key: 19, value: "Warwick" },
    { key: 72, value: "Skarner" },
    { key: 54, value: "Malphite" },
    { key: 157, value: "Yasuo" },
    { key: 101, value: "Xerath" },
    { key: 17, value: "Teemo" },
    { key: 75, value: "Nasus" },
    { key: 58, value: "Renekton" },
    { key: 119, value: "Draven" },
    { key: 35, value: "Shaco" },
    { key: 50, value: "Swain" },
    { key: 91, value: "Talon" },
    { key: 40, value: "Janna" },
    { key: 115, value: "Ziggs" },
    { key: 245, value: "Ekko" },
    { key: 61, value: "Orianna" },
    { key: 114, value: "Fiora" },
    { key: 9, value: "Fiddlesticks" },
    { key: 31, value: "Cho'Gath" },
    { key: 33, value: "Rammus" },
    { key: 7, value: "LeBlanc" },
    { key: 16, value: "Soraka" },
    { key: 26, value: "Zilean" },
    { key: 56, value: "Nocturne" },
    { key: 222, value: "Jinx" },
    { key: 83, value: "Yorick" },
    { key: 6, value: "Urgot" },
    { key: 203, value: "Kindred" },
    { key: 21, value: "Miss Fortune" },
    { key: 62, value: "Wukong" },
    { key: 53, value: "Blitzcrank" },
    { key: 98, value: "Shen" },
    { key: 201, value: "Braum" },
    { key: 5, value: "Xin Zhao" },
    { key: 29, value: "Twitch" },
    { key: 11, value: "Master Yi" },
    { key: 44, value: "Taric" },
    { key: 32, value: "Amumu" },
    { key: 41, value: "Gangplank" },
    { key: 48, value: "Trundle" },
    { key: 38, value: "Kassadin" },
    { key: 161, value: "Vel'Koz" },
    { key: 143, value: "Zyra" },
    { key: 267, value: "Nami" },
    { key: 59, value: "Jarvan IV" },
    { key: 81, value: "Ezreal" },
    { key: 164, value: "Camille" },
    { key: 141, value: "Kayn" },
    { key: 516, value: "Ornn" },
    { key: 142, value: "Zoe" },
    { key: 498, value: "Xayah" },
    { key: 497, value: "Rakan" },
    { key: 555, value: "Pyke" },
    { key: 145, value: "Kai'Sa" },
    { key: 518, value: "Neeko" },
    { key: 235, value: "Senna" },
    { key: 523, value: "Aphelios" },
    { key: 517, value: "Sylas" },
    { key: 350, value: "Yuumi" },
    { key: 246, value: "Qiyana" },
    { key: 875, value: "Sett" },
    { key: 876, value: "Lillia" },
    { key: 777, value: "Yone" },
  ];

  const champ = champs.filter((elem) => {
    return elem.key === id;
  });

  return champ.length === 1 ? champ[0].value : "Samira";
}
