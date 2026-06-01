import { describe, expect, it } from "vitest"

import { processMove } from "../process-move"

import { createBaseState, createCard } from "./helpers"

describe("play card", () => {
  it("should allow valid move", () => {
    const state = createBaseState()

    state.hands.p1 = [createCard("red5", "red", 5)]

    state.discardPile = [createCard("red7", "red", 7)]

    const result = processMove(state, {
      type: "play_card",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
      cardId: "red5",
    })

    expect(result.success).toBe(true)
  })

  it("should reject invalid move", () => {
    const state = createBaseState()

    state.hands.p1 = [createCard("blue5", "blue", 5)]

    state.discardPile = [createCard("red7", "red", 7)]

    const result = processMove(state, {
      type: "play_card",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
      cardId: "blue5",
    })

    expect(result.success).toBe(false)
  })
})
