import { describe, expect, it } from "vitest"

import { applyPlayCardMove } from "../moves/apply-play-card"

import { createBaseState, createCard } from "./helpers"

describe("draw2", () => {
  it("should force next player to draw 2 cards", () => {
    const state = createBaseState()

    state.deck = [createCard("d1", "red", 1), createCard("d2", "red", 2)]

    state.hands.p1 = [
      createCard("draw2", "red", "draw2"),
      createCard("keep", "red", 5),
    ]

    state.discardPile = [createCard("top", "red", 7)]

    const result = applyPlayCardMove(state, {
      type: "play_card",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
      cardId: "draw2",
    })

    expect(result.hands.p2).toHaveLength(2)

    expect(result.currentPlayerId).toBe("p3")
  })
})
