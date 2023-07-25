import { defaultTeamState } from "../data/state";
import type { GameState, TeamName, TeamState } from "../types";
import { otherTeam } from "../../utils";


export class StateManager implements GameState {
  team1: TeamState;
  team2: TeamState;
  private static instance: StateManager;
  static get activeTeam() {
    return this.instance.activeTeam;
  }
  static get enemyTeam() {
    return otherTeam(this.activeTeam);
  }
  static get global() {
    return {
      team1: this.instance.team1,
      team2: this.instance.team2,
    };
  }
  private constructor(private activeTeam: TeamName) {
    this.team1 = defaultTeamState
    this.team2 = defaultTeamState
  }

  static init(selectedTeam: TeamName) {
    StateManager.instance = new StateManager(selectedTeam);
  }
}