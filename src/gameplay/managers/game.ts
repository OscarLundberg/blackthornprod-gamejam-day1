import { writable, type Writable } from "svelte/store";
import { ThrottleManager } from "./throttle";
import { StateManager } from "./state";
import { actions } from "../data/actions";
import { BackendManager } from "./backend";
import { mergeStates, otherTeam } from "../../utils";
import { defaultTeamState } from "../data/state";
import type { GameState, TeamName } from "../types";
import { endConditions } from "../data/end-conditions";

export enum GameStage {
  TeamSelect,
  Gameplay,
  GameOver
}



/**
 * Handler for the game, provides the API for the DOM to interface with
 */
export class Game {
  static readonly STATE_UPDATE_COOLDOWN = 5;
  static stage: Writable<GameStage> = writable(GameStage.TeamSelect);
  static state: Writable<GameState> = writable({ team1: defaultTeamState, team2: defaultTeamState });
  static gameOverMsg: Writable<{ reason: string, outcome: string }> = writable({ reason: "", outcome: "" });
  public static moveCooldown: Writable<number> = writable(0);
  static activeTimer: number;
  static halt: boolean = false;
  static init() {
    ThrottleManager.init();
  }

  static selectTeam(team: TeamName) {
    StateManager.init(team);
    this.stage.set(GameStage.Gameplay);
    this.updateGameState();
  }

  static makeMove(action: keyof typeof actions) {
    BackendManager.makeMove(action);
  }

  private static updateGameState() {
    if (Game.halt) { return }
    clearTimeout(Game.activeTimer);
    Game.activeTimer = setTimeout(async _ => {
      const backendData = await BackendManager.fetchAllData();
      const state = this.tallyScores(backendData);
      Game.state.set(state);
      Game.updateGameState();
    }, this.STATE_UPDATE_COOLDOWN * 1000);
  }

  private static endGame(gameover:{reason:string, outcome:string}) {
    Game.halt = true;
    this.gameOverMsg.set(gameover);
    Game.stage.set(GameStage.GameOver);
  }

  private static tallyScores(data: Record<string, any>) {
    let state = {
      team1: structuredClone(defaultTeamState),
      team2: structuredClone(defaultTeamState)
    }
    for (let [entry, amount] of Object.entries(data)) {
      //@ts-ignore
      const [team, action]: [TeamName, keyof typeof actions] = entry.split("-");
      const deltaState = actions[action](StateManager.global, team, otherTeam(team));
      state = mergeStates(state, deltaState, amount);
    }

    for (let condition of endConditions) {
      const self = StateManager.activeTeam;
      const other = StateManager.enemyTeam;


      if (condition.func(state[self], state[other])) {
        this.endGame({
          reason: `${self} ${condition.verb} due to ${condition.label}`,
          outcome: condition.verb == "won" ? "Win" : "Lose"
        });
      }

      if (condition.func(state[other], state[self])) {
        this.endGame({
          reason: `${other} ${condition.verb} due to ${condition.label}`,
          outcome: condition.verb == "lost" ? "Win" : "Lose"
        });
      }
    }
    return state;
  }

}