import { Game } from "./game";

/**
 * Handles throttling of requests to the server
 */
export class ThrottleManager {
  static readonly COOLDOWN = 5;
  private static activeTimer: number;
  private static activeVisualTimer: number;
  public static isAllowedToMove: boolean;

  public static onMoveMade() {
    this.isAllowedToMove = false;
    this.resetPeriodicUpdates();
  }

  private static resetPeriodicUpdates() {
    clearTimeout(ThrottleManager.activeTimer);
    ThrottleManager.activeTimer = setTimeout(e => {
      ThrottleManager.isAllowedToMove = true;
    }, ThrottleManager.COOLDOWN * 1000);
    
    
    let cd = ThrottleManager.COOLDOWN;
    clearTimeout(ThrottleManager.activeVisualTimer);
    ThrottleManager.activeVisualTimer = setInterval(() => {
      cd -= 0.1;
      Game.moveCooldown.set(cd)
    }, 100);
  }

  static init() {
    this.resetPeriodicUpdates();
  }

}