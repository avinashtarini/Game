import { Player } from "../../player"

export interface RoomResponse {
  roomId: string
  hostPlayerId: string
  players: Player[]
  gameId?: string
}
