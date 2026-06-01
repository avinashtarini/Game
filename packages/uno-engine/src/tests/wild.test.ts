import { describe, expect, it } from "vitest"

import { applyPlayCardMove } from "../moves/apply-play-card"

import { createBaseState, createCard } from "./helpers"

describe("wild", () => {
  it("should change active color", () => {
    const state = createBaseState()

    state.hands.p1 = [
      createCard("wild", "wild", "wild"),
      createCard("keep", "red", 5),
    ]

    state.discardPile = [createCard("top", "yellow", 9)]

    const result = applyPlayCardMove(state, {
      type: "play_card",
      gameId: "g",
      playerId: "p1",
      timestamp: Date.now(),
      cardId: "wild",
      chosenColor: "blue",
    })

    expect(result.activeColor).toBe("blue")
  })
})
