import { describe, it, expect } from "vitest"
import { createDeck } from "../utils/create-deck"

describe("createDeck", () => {
  it("should create 108 cards", () => {
    const deck = createDeck()

    expect(deck).toHaveLength(108)
  })

  it("should have unique ids", () => {
    const deck = createDeck()

    const ids = deck.map((card) => card.id)

    expect(ids.length).toBe(new Set(ids).size)
  })
})
