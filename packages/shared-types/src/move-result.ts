import { GameState } from "./game-state"

export interface MoveResult {
  success: boolean
  state?: GameState
  error?: string
}
