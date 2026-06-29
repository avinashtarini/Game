import { GameState, Move, MoveResult } from "@game/shared-types"

import { validatePlayCardMove } from "./validators/validate-play-card"
import { applyPlayCardMove } from "./moves/apply-play-card"

import { validateDrawCardMove } from "./validators/validate-draw-card"
import { applyDrawCardMove } from "./moves/apply-draw-card"
import { applyCallUnoMove } from "./moves/apply-call-uno"
import { validateCallUnoMove } from "./validators/validate-call-uno"
import { applyCatchUnoMove } from "./moves/apply-catch-uno"
import { validateCatchUnoMove } from "./validators/validate-catch-uno"

export function processMove(state: GameState, move: Move): MoveResult {
  switch (move.type) {
    case "play_card": {
      const validation = validatePlayCardMove(state, move)

      if (!validation.isValid) {
        return {
          success: false,
          error: validation.reason,
        }
      }

      const newState = applyPlayCardMove(state, move)

      return {
        success: true,
        state: newState,
      }
    }

    case "draw_card": {
      const validation = validateDrawCardMove(state, move)

      if (!validation.isValid) {
        return {
          success: false,
          error: validation.reason,
        }
      }

      return {
        success: true,
        state: applyDrawCardMove(state, move),
      }
    }

    case "call_uno": {
      const validation = validateCallUnoMove(state, move)

      if (!validation.isValid) {
        return {
          success: false,
          error: validation.reason,
        }
      }

      return {
        success: true,
        state: applyCallUnoMove(state, move),
      }
    }

    case "catch_uno": {
      const validation = validateCatchUnoMove(state, move)

      if (!validation.isValid) {
        return {
          success: false,
          error: validation.reason,
        }
      }

      return {
        success: true,
        state: applyCatchUnoMove(state, move),
      }
    }

    default:
      return {
        success: false,
        error: `Unsupported move type: ${move.type}`,
      }
  }
}
