import { transliterate } from "transliteration";

function generateIdToCorrectFormat(id: string) {
  id = id.replaceAll("`", "_");
  id = id.replaceAll(" ", "");
  return id;
}

export function generateCorrectFormatOfUsername(username: string) {
  const inputUsername = `${generateIdToCorrectFormat(
    `${transliterate(username)}`
  )}`;
  const replaceInput = inputUsername.replace("@gmail.com", "");
  return `${replaceInput}@gmail.com`;
}

export function filterDivisionData(
  teams: {
    division_id: any;
    team_name: any;
    placement: any;
    win: any;
    draw: any;
    lost: any;
    played: any;
    point: any;
    strength: any;
  }[]
) {
  // Sort the data based on points and strength
  teams.sort((a, b) => {
    // First, compare points
    if (a.point !== b.point) {
      return b.point - a.point; // Higher points come first
    } else {
      // If points are the same, compare strengths
      return b.strength - a.strength; // Higher strength come first
    }
  });

  return teams;
}

export function generateMatchSchedule(teams: string[]) {
  if (teams.length % 2 !== 0) {
    teams.push("Bye"); // Add a bye if the number of teams is odd
  }

  const numberOfRounds = teams.length - 1;
  const matchesPerRound = teams.length / 2;

  const matchSchedule = [];

  // Generate the initial round-robin schedule
  for (let round = 0; round < numberOfRounds; round++) {
    const roundMatches = [];
    for (let match = 0; match < matchesPerRound; match++) {
      const home = (round + match) % (teams.length - 1);
      const away = (teams.length - 1 - match + round) % (teams.length - 1);
      // Change this condition to handle the case when 'Bye' is involved
      if (away === teams.length - 1) {
        roundMatches.push([teams[home], teams[away]]);
      } else {
        roundMatches.push([teams[home], teams[away]]);
      }
    }
    matchSchedule.push(roundMatches);
  }

  // Generate the final schedule with reversed matches
  const finalSchedule = [];
  for (let round = 0; round < numberOfRounds; round++) {
    const roundMatches = [];
    for (let match = 0; match < matchesPerRound; match++) {
      if (match === 0) {
        roundMatches.push([teams[teams.length - 1], teams[round]]);
      } else {
        roundMatches.push(matchSchedule[round][matchesPerRound - match]);
      }
    }
    finalSchedule.push(roundMatches);
  }

  return finalSchedule;
}

export const isClient = () => typeof window !== "undefined";

export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  let copy: any = Array.isArray(obj) ? [] : {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }

  return copy as T;
}
