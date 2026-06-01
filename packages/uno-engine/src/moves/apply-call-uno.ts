import { CallUnoMove, GameState } from "@game/shared-types"

export function applyCallUnoMove(
  state: GameState,
  move: CallUnoMove,
): GameState {
  return {
    ...state,

    unoPendingPlayerIds: state.unoPendingPlayerIds.filter(
      (id) => id !== move.playerId,
    ),

    updatedAt: Date.now(),
  }
}
