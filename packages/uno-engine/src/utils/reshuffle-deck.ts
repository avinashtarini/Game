import { Card } from "@game/shared-types"
import { shuffle } from "./shuffle"

export function reshuffleDeck(discardPile: Card[]): {
  deck: Card[]
  discardPile: Card[]
} {
  const topCard = discardPile[discardPile.length - 1]

  const cardsToShuffle = discardPile.slice(0, discardPile.length - 1)

  if (cardsToShuffle.length === 0) {
    throw new Error("Cannot reshuffle deck")
  }

  return {
    deck: shuffle(cardsToShuffle),

    discardPile: [topCard],
  }
}
