import { describe, expect, it } from "vitest"

import { applyPlayCardMove } from "../moves/apply-play-card"

import { createBaseState, createCard } from "./helpers"

describe("reverse", () => {
  it("should reverse direction", () => {
    const state = createBaseState()

    state.hands.p1 = [
      createCard("reverse", "red", "reverse"),
      createCard("keep", "red", 5),
    ]

    state.discardPile = [createCard("top", "red", 1)]

    const result = applyPlayCardMove(state, {
      type: "play_card",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
      cardId: "reverse",
    })

    expect(result.direction).toBe(-1)

    expect(result.currentPlayerId).toBe("p4")
  })
})
