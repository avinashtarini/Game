import { Card, CardColor } from "@game/shared-types"

const COLORS: Exclude<CardColor, "wild">[] = ["red", "blue", "green", "yellow"]

export function createDeck(): Card[] {
  const deck: Card[] = []

  for (const color of COLORS) {
    // single zero
    deck.push({
      id: `${color}-0-1`,
      color,
      value: 0,
    })

    // 1-9 twice
    for (let number = 1; number <= 9; number++) {
      deck.push({
        id: `${color}-${number}-1`,
        color,
        value: number,
      })

      deck.push({
        id: `${color}-${number}-2`,
        color,
        value: number,
      })
    }

    // skip twice
    deck.push({
      id: `${color}-skip-1`,
      color,
      value: "skip",
    })

    deck.push({
      id: `${color}-skip-2`,
      color,
      value: "skip",
    })

    // reverse twice
    deck.push({
      id: `${color}-reverse-1`,
      color,
      value: "reverse",
    })

    deck.push({
      id: `${color}-reverse-2`,
      color,
      value: "reverse",
    })

    // draw2 twice
    deck.push({
      id: `${color}-draw2-1`,
      color,
      value: "draw2",
    })

    deck.push({
      id: `${color}-draw2-2`,
      color,
      value: "draw2",
    })
  }

  // wild cards
  for (let i = 1; i <= 4; i++) {
    deck.push({
      id: `wild-${i}`,
      color: "wild",
      value: "wild",
    })

    deck.push({
      id: `wild-draw4-${i}`,
      color: "wild",
      value: "wild_draw4",
    })
  }

  return deck
}
