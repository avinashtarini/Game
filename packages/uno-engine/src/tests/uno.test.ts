import { describe, it, expect } from "vitest"

import { applyPlayCardMove } from "../moves/apply-play-card"
import { applyCallUnoMove } from "../moves/apply-call-uno"

import { createBaseState, createCard } from "./helpers"

describe("UNO", () => {
  it("should add player to pending list", () => {
    const state = createBaseState()

    const playCard = createCard("r5", "red", 5)

    const remaining = createCard("r6", "red", 6)

    state.hands.p1 = [playCard, remaining]

    state.discardPile = [createCard("r7", "red", 7)]

    const result = applyPlayCardMove(state, {
      type: "play_card",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
      cardId: "r5",
    })

    expect(result.unoPendingPlayerIds).toContain("p1")
  })

  it("should clear pending after call uno", () => {
    const state = createBaseState()

    state.unoPendingPlayerIds = ["p1"]

    const result = applyCallUnoMove(state, {
      type: "call_uno",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
    })

    expect(result.unoPendingPlayerIds).toHaveLength(0)
  })
})
