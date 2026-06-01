import { describe, expect, it } from "vitest"

import { applyPlayCardMove } from "../moves/apply-play-card"

import { createBaseState, createCard } from "./helpers"

describe("skip", () => {
  it("should skip next player", () => {
    const state = createBaseState()

    state.hands.p1 = [
      createCard("skip", "red", "skip"),
      createCard("keep", "red", 5),
    ]

    state.discardPile = [createCard("top", "red", 1)]

    const result = applyPlayCardMove(state, {
      type: "play_card",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
      cardId: "skip",
    })

    expect(result.currentPlayerId).toBe("p3")
  })
})
