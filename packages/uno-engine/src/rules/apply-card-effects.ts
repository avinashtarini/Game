import { Card } from "@game/shared-types"
import { CardEffects } from "../types/card-effects"

export function applyCardEffects(
  card: Card,
  currentDirection: 1 | -1,
): CardEffects {
  switch (card.value) {
    case "wild":
      return {}
    case "wild_draw4":
      return {
        cardsToDraw: 4,
        skipCount: 1,
      }
    case "reverse":
      return {
        direction: currentDirection === 1 ? -1 : 1,
      }

    case "skip":
      return {
        skipCount: 1,
      }
    case "draw2":
      return {
        cardsToDraw: 2,
        skipCount: 1,
      }

    default:
      return {}
  }
}
