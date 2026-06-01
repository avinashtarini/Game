import { Card, CardColor } from "./card"
import { Player } from "./player"

export type GameStatus = "waiting" | "in_progress" | "finished"

export interface GameState {
  gameId: string

  roomId: string

  players: Player[]

  hands: Record<string, Card[]>

  deck: Card[]

  discardPile: Card[]

  currentPlayerId: string

  direction: 1 | -1

  drawStack: number

  winnerId?: string

  status: GameStatus

  createdAt: number

  updatedAt: number
  activeColor: CardColor
  unoPendingPlayerIds: string[]
}
