import type { defaultTeamState } from "./data/state";

export type TeamName = "team1" | "team2";
export type ActionImplementation = (state: GameState, allies?: TeamName, enemy?: TeamName) => PartialState;
export type TeamState = typeof defaultTeamState;

export interface PartialState extends Record<string, Partial<TeamState>> {
  team1?: Partial<TeamState>;
  team2?: Partial<TeamState>;
}

export interface GameState {
  team1: TeamState;
  team2: TeamState;
}

export type EndCondition = {
  label: string;
  func: (team: TeamState, enemyTeam: TeamState) => boolean;
  verb: "won" | "lost";
}