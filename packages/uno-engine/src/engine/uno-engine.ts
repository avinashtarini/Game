import { GameState, Move } from "@game/shared-types"

import { processMove } from "../process-move"
import { MoveResult } from "../types/move-result"

export class UnoEngine {
  applyMove(state: GameState, move: Move): MoveResult {
    return processMove(state, move)
  }
}
