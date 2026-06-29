import { Move } from "../../moves"

export interface GameMoveEvent {
  gameId: string
  move: Move
}
