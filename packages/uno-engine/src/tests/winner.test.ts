import { describe, it, expect } from "vitest"

import { applyPlayCardMove } from "../moves/apply-play-card"

import { createBaseState, createCard } from "./helpers"

describe("winner", () => {
  it("should declare winner when last card played", () => {
    const card = createCard("r5", "red", 5)

    const state = createBaseState()

    state.hands.p1 = [card]

    state.discardPile = [createCard("r7", "red", 7)]

    const result = applyPlayCardMove(state, {
      type: "play_card",
      gameId: "game-1",
      playerId: "p1",
      timestamp: Date.now(),
      cardId: "r5",
    })

    expect(result.winnerId).toBe("p1")

    expect(result.status).toBe("finished")
  })
})
