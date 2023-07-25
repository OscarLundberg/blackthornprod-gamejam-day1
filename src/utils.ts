import type { PartialState, TeamName } from "./gameplay/types";

export function otherTeam(t: TeamName): TeamName {
  if (t == "team1") return "team2"
  return "team1";
}

export function mergeStates<T extends PartialState>(a: T, b: PartialState, amount: number = 1) {
  const copy = {
    team1: {},
    team2: {},
    ...structuredClone(a)
  }

  const copyB = {
    team1: {},
    team2: {},
    ...structuredClone(b)
  }

  
  for (let [key, val] of Object.entries(copyB.team1)) {
    const actualVal = val * amount;
    copy.team1[key] = copy.team1?.[key] + actualVal ?? actualVal;
  }
  for (let [key, val] of Object.entries(copyB?.team2)) {
    const actualVal = val * amount;
    copy.team2[key] = copy.team2?.[key] + actualVal ?? actualVal;
  }
  return copy;
}

export function camel2title(camelCase) {
  return camelCase
    .replace(/([A-Z])/g, function(match) {
       return " " + match;
    })
    .replace(/^./, function(match) {
      return match.toUpperCase();
    });
}