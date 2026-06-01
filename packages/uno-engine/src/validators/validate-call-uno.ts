import { CallUnoMove, GameState } from "@game/shared-types"

import { ValidationResult } from "../types/validation-result"

export function validateCallUnoMove(
  state: GameState,
  move: CallUnoMove,
): ValidationResult {
  const isPending = state.unoPendingPlayerIds.includes(move.playerId)

  if (!isPending) {
    return {
      isValid: false,
      reason: "Player is not pending UNO",
    }
  }

  return {
    isValid: true,
  }
}
