import { StateManager } from "./state";
import { ThrottleManager } from "./throttle";
import { otherTeam } from "../../utils";
import type { actions } from "../data/actions";

//@ts-ignore
const BASE_API_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}`;

/**
 * handles communication with backend
 */
export class BackendManager {
  static makeMove(action: keyof typeof actions) {
    ThrottleManager.onMoveMade();
    this.update(action);
  }

  private static async update(action: string) {
    const res = await fetch(`${BASE_API_ENDPOINT}/hit/${StateManager.activeTeam}-${action}`);
    return res.status;
  }

  static async fetchAllData() {
    const res = await fetch(`${BASE_API_ENDPOINT}/list`);
    return res.json();
  }
}

