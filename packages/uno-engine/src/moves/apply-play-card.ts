import { GameState, PlayCardMove } from "@game/shared-types"

import { getNthNextPlayerId } from "../utils/get-next-player"
import { applyCardEffects } from "../rules/apply-card-effects"
import { drawCards } from "../rules/draw-cards"
import { cleanupExpiredUno } from "../utils/cleanup-expired-uno"

export function applyPlayCardMove(
  state: GameState,
  move: PlayCardMove,
): GameState {
  const playerHand = [...state.hands[move.playerId]]

  const cardIndex = playerHand.findIndex((c) => c.id === move.cardId)

  const [playedCard] = playerHand.splice(cardIndex, 1)

  const newHands = {
    ...state.hands,
    [move.playerId]: playerHand,
  }

  const activeColor =
    playedCard.color === "wild" ? move.chosenColor! : playedCard.color

  const effects = applyCardEffects(playedCard, state.direction)

  const nextDirection = effects.direction ?? state.direction

  const skipCount = effects.skipCount ?? 0

  let deck = state.deck

  const targetPlayerId = getNthNextPlayerId(
    state.players,
    state.currentPlayerId,
    nextDirection,
    1,
  )

  if (effects.cardsToDraw) {
    const { drawnCards, remainingDeck } = drawCards(deck, effects.cardsToDraw)

    newHands[targetPlayerId] = [...newHands[targetPlayerId], ...drawnCards]

    deck = remainingDeck
  }

  const nextPlayerId = getNthNextPlayerId(
    state.players,
    state.currentPlayerId,
    nextDirection,
    1 + skipCount,
  )

  const winnerId = playerHand.length === 0 ? move.playerId : undefined
  let unoPendingPlayerIds = [...state.unoPendingPlayerIds]

  if (playerHand.length === 1 && !unoPendingPlayerIds.includes(move.playerId)) {
    unoPendingPlayerIds.push(move.playerId)
  }

  if (winnerId) {
    unoPendingPlayerIds = unoPendingPlayerIds.filter(
      (id) => id !== move.playerId,
    )
  }

  if (!winnerId) {
    unoPendingPlayerIds = cleanupExpiredUno(unoPendingPlayerIds, nextPlayerId)
  }

  return {
    ...state,

    direction: nextDirection,

    hands: newHands,

    deck,

    discardPile: [...state.discardPile, playedCard],

    currentPlayerId: winnerId ? state.currentPlayerId : nextPlayerId,

    winnerId,

    status: winnerId ? "finished" : state.status,

    updatedAt: Date.now(),

    activeColor,

    unoPendingPlayerIds,
  }
}
