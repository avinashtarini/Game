import { describe, expect, it } from "vitest"

import { applyDrawCardMove } from "../moves/apply-draw-card"

import { createBaseState, createCard } from "./helpers"

describe("draw card", () => {
  it("should draw one card", () => {
    const state = createBaseState()

    state.deck = [createCard("drawn", "red", 5)]

    const result = applyDrawCardMove(state, {
      type: "draw_card",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
    })

    expect(result.hands.p1).toHaveLength(1)

    expect(result.currentPlayerId).toBe("p2")
  })
})
