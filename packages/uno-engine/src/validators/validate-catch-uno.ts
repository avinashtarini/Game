import { CatchUnoMove, GameState } from "@game/shared-types"

import { ValidationResult } from "../types/validation-result"

export function validateCatchUnoMove(
  state: GameState,
  move: CatchUnoMove,
): ValidationResult {
  if (move.playerId === move.targetPlayerId) {
    return {
      isValid: false,
      reason: "Cannot catch yourself",
    }
  }

  const targetPending = state.unoPendingPlayerIds.includes(move.targetPlayerId)

  if (!targetPending) {
    return {
      isValid: false,
      reason: "Target is not pending UNO",
    }
  }

  return {
    isValid: true,
  }
}
