import { Player } from "./player"

export interface Room {
  roomId: string
  hostPlayerId: string
  players: Player[]
  gameId?: string
  createdAt: number
}
