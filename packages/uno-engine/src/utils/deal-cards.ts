import { Card, Player } from "@game/shared-types"

type DealCardsResult = {
  hands: Record<string, Card[]>
  remainingDeck: Card[]
}

const INITIAL_HAND_SIZE = 7

export function dealCards(deck: Card[], players: Player[]): DealCardsResult {
  const workingDeck = [...deck]

  const hands: Record<string, Card[]> = {}

  // initialize hands
  for (const player of players) {
    hands[player.playerId] = []
  }

  // deal 7 cards round-robin
  for (let round = 0; round < INITIAL_HAND_SIZE; round++) {
    for (const player of players) {
      const card = workingDeck.shift()

      if (!card) {
        throw new Error("Not enough cards to deal")
      }

      hands[player.playerId].push(card)
    }
  }

  return {
    hands,
    remainingDeck: workingDeck,
  }
}
