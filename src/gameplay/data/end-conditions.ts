import type { EndCondition } from "../types";

const endConditionVariables = {
  minGold: -1000,
  maxGoldDiff: 1000,
}

export const endConditions: EndCondition[] = [

  {
    label: "Bankruptcy",
    func(state) {
      return state.gold <= endConditionVariables.minGold
    },
    verb: "lost"
  },
  {
    label: "Defeat in battle",
    func(state) {
      return state.health <= 0
    },
    verb: "lost"
  },
  {
    label: "Strong economy",
    func(state, enemy) {
      return state.gold >= (enemy.gold + endConditionVariables.maxGoldDiff)
    },
    verb: "won"
  }
];