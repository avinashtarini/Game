import { Card, GameState, Player } from "@game/shared-types"

import { createDeck } from "./create-deck"
import { shuffle } from "./shuffle"
import { dealCards } from "./deal-cards"

export function startGame(
  gameId: string,
  roomId: string,
  players: Player[],
): GameState {
  const deck = shuffle(createDeck())

  const { hands, remainingDeck } = dealCards(deck, players)

  const workingDeck = [...remainingDeck]

  let firstDiscard: Card | undefined

  while (workingDeck.length > 0) {
    const card = workingDeck.shift()!

    if (typeof card.value === "number") {
      firstDiscard = card
      break
    }

    workingDeck.push(card)
  }

  if (!firstDiscard) {
    throw new Error("Unable to create starting discard card")
  }

  return {
    gameId,

    roomId,

    players,

    hands,

    deck: workingDeck,

    discardPile: [firstDiscard],

    currentPlayerId: players[0].playerId,

    direction: 1,

    drawStack: 0,

    winnerId: undefined,

    status: "in_progress",

    createdAt: Date.now(),

    updatedAt: Date.now(),
    activeColor: firstDiscard.color,
    unoPendingPlayerIds: [],
  }
}
