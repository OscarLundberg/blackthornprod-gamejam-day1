import type { ActionImplementation } from "../types"

/**
 * Dictionary of possible actions
 * The parameters are a reference to state and the allied/enemy team names. 
 * Each implementation should return a partial "delta" state, of how the state should be affected whenever the action is taken.
 * Actions are evaluated client side - Must be deterministic
 */
export const actions: Record<string, ActionImplementation> = {
  stealGold(state, allies, enemies) {
    return {
      [allies]: {
        gold: 3,
      },
      [enemies]: {
        gold: -3
      },
    }
  },
  regenerate(state, allies) {
    return {
      [allies]: {
        health: 3
      }
    }
  },
  mineGold(state, allies) {
    return {
      [allies]: {
        gold: 10
      }
    }
  },
  attack(state, _, enemies) {
    return {
      [enemies]: {
        health: -5
      }
    }
  },
  grift(state, _, enemies) {
    return {
      [enemies]: {
        gold: -10
      }
    }
  }
}
