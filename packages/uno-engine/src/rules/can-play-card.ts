import { Card, CardColor } from "@game/shared-types"

export function canPlayCard(
  playedCard: Card,
  topCard: Card,
  activeColor: CardColor,
): boolean {
  if (playedCard.color === "wild") {
    return true
  }

  if (playedCard.color === activeColor) {
    return true
  }

  if (playedCard.value === topCard.value) {
    return true
  }

  return false
}
