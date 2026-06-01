import { CatchUnoMove, GameState } from "@game/shared-types"

import { drawCards } from "../rules/draw-cards"

export function applyCatchUnoMove(
  state: GameState,
  move: CatchUnoMove,
): GameState {
  const { drawnCards, remainingDeck } = drawCards(state.deck, 2)

  const newHands = {
    ...state.hands,

    [move.targetPlayerId]: [...state.hands[move.targetPlayerId], ...drawnCards],
  }

  return {
    ...state,

    deck: remainingDeck,

    hands: newHands,

    unoPendingPlayerIds: state.unoPendingPlayerIds.filter(
      (id) => id !== move.targetPlayerId,
    ),

    updatedAt: Date.now(),
  }
}
