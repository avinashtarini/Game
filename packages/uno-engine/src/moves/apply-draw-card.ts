import { DrawCardMove, GameState } from "@game/shared-types"

import { getNthNextPlayerId } from "../utils/get-next-player"
import { reshuffleDeck } from "../utils/reshuffle-deck"
import { cleanupExpiredUno } from "../utils/cleanup-expired-uno"

export function applyDrawCardMove(
  state: GameState,
  move: DrawCardMove,
): GameState {
  let deck = state.deck
  let discardPile = state.discardPile

  if (deck.length === 0) {
    const reshuffled = reshuffleDeck(discardPile)

    deck = reshuffled.deck

    discardPile = reshuffled.discardPile
  }

  const [drawnCard, ...remainingDeck] = deck

  const newHands = {
    ...state.hands,

    [move.playerId]: [...state.hands[move.playerId], drawnCard],
  }

  const nextPlayerId = getNthNextPlayerId(
    state.players,
    state.currentPlayerId,
    state.direction,
    1,
  )

  const unoPendingPlayerIds = cleanupExpiredUno(
    state.unoPendingPlayerIds,
    nextPlayerId,
  )

  return {
    ...state,

    deck: remainingDeck,

    hands: newHands,

    currentPlayerId: nextPlayerId,

    updatedAt: Date.now(),
    discardPile,
    unoPendingPlayerIds,
  }
}
