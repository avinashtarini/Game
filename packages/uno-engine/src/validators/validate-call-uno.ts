import { CallUnoMove, GameState, ValidationResult } from "@game/shared-types"

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
