import { CardColor } from "./card"

export interface MoveBase {
  gameId: string
  playerId: string
  timestamp: number
}
export interface StartGameMove extends MoveBase {
  type: "start_game"
}
export interface PlayCardMove extends MoveBase {
  type: "play_card"
  cardId: string
  chosenColor?: CardColor
}

export interface DrawCardMove extends MoveBase {
  type: "draw_card"
}

export interface CallUnoMove extends MoveBase {
  type: "call_uno"
}
export interface CatchUnoMove extends MoveBase {
  type: "catch_uno"
  targetPlayerId: string
}
export type Move =
  | StartGameMove
  | PlayCardMove
  | DrawCardMove
  | CallUnoMove
  | CatchUnoMove
