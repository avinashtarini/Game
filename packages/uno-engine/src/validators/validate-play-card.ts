import { GameState, PlayCardMove, ValidationResult } from "@game/shared-types"

import { canPlayCard } from "../rules/can-play-card"

export function validatePlayCardMove(
  state: GameState,
  move: PlayCardMove,
): ValidationResult {
  const playerHand = state.hands[move.playerId]

  if (!playerHand) {
    return {
      isValid: false,
      reason: "Player hand not found",
    }
  }

  const card = playerHand.find((c) => c.id === move.cardId)

  if (!card) {
    return {
      isValid: false,
      reason: "Card not found in hand",
    }
  }

  if (card.value === "wild" || card.value === "wild_draw4") {
    if (!move.chosenColor) {
      return {
        isValid: false,
        reason: "Must choose color",
      }
    }
  }

  if (state.currentPlayerId !== move.playerId) {
    return {
      isValid: false,
      reason: "Not your turn",
    }
  }

  const topCard = state.discardPile[state.discardPile.length - 1]

  const valid = canPlayCard(card, topCard, state.activeColor)

  if (!valid) {
    return {
      isValid: false,
      reason: "Card cannot be played",
    }
  }

  return {
    isValid: true,
  }
}
