import { describe, it, expect } from "vitest"

import { startGame } from "../utils/start-game"
import { createPlayer } from "./helpers"

describe("startGame", () => {
  it("should deal 7 cards to each player", () => {
    const state = startGame("game-1", "room-1", [
      createPlayer("p1"),
      createPlayer("p2"),
      createPlayer("p3"),
      createPlayer("p4"),
    ])

    expect(state.hands.p1).toHaveLength(7)
    expect(state.hands.p2).toHaveLength(7)
    expect(state.hands.p3).toHaveLength(7)
    expect(state.hands.p4).toHaveLength(7)
  })

  it("should start in progress", () => {
    const state = startGame("game-1", "room-1", [
      createPlayer("p1"),
      createPlayer("p2"),
      createPlayer("p3"),
      createPlayer("p4"),
    ])

    expect(state.status).toBe("in_progress")
  })
})
