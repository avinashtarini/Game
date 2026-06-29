import { DrawCardMove, GameState, ValidationResult } from "@game/shared-types"

export function validateDrawCardMove(
  state: GameState,
  move: DrawCardMove,
): ValidationResult {
  if (state.currentPlayerId !== move.playerId) {
    return {
      isValid: false,
      reason: "Not your turn",
    }
  }

  if (state.deck.length === 0) {
    return {
      isValid: false,
      reason: "Deck is empty",
    }
  }

  return {
    isValid: true,
  }
}
