import { Card } from "@game/shared-types"

export function drawCards(
  deck: Card[],
  count: number,
): {
  drawnCards: Card[]
  remainingDeck: Card[]
} {
  const drawnCards = deck.slice(0, count)

  const remainingDeck = deck.slice(count)

  return {
    drawnCards,
    remainingDeck,
  }
}
