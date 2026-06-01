import { GameState } from "@game/shared-types"

export interface MoveResult {
  success: boolean
  state?: GameState
  error?: string
}
