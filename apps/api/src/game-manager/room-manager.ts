import { Player, Room } from "@game/shared-types"

export class RoomManager {
  private rooms = new Map<string, Room>()

  startGame(roomId: string, gameId: string) {
    const room = this.rooms.get(roomId)

    if (!room) {
      throw new Error("Room not found")
    }
    if (room.gameId) {
      throw new Error("Game already started")
    }

    room.gameId = gameId

    return room
  }

  createRoom(roomId: string, host: Player): Room {
    const room: Room = {
      roomId,

      hostPlayerId: host.playerId,

      players: [host],

      createdAt: Date.now(),
    }

    this.rooms.set(roomId, room)

    return room
  }

  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId)
  }

  joinRoom(roomId: string, player: Player): Room {
    const room = this.rooms.get(roomId)

    if (!room) {
      throw new Error("Room not found")
    }
    if (room.gameId) {
      throw new Error("Game already started")
    }
    const existingPlayer = room.players.find(
      (p) => p.playerId === player.playerId,
    )

    if (existingPlayer) {
      existingPlayer.isConnected = true

      return room
    }

    room.players.push(player)

    return room
  }
  leaveRoom(roomId: string, playerId: string): Room {
    const room = this.rooms.get(roomId)

    if (!room) {
      throw new Error("Room not found")
    }

    room.players = room.players.filter((player) => player.playerId !== playerId)

    return room
  }
  markDisconnected(roomId: string, playerId: string): Room {
    const room = this.rooms.get(roomId)

    if (!room) {
      throw new Error("Room not found")
    }

    const player = room.players.find((p) => p.playerId === playerId)

    if (!player) {
      throw new Error("Player not found")
    }

    player.isConnected = false

    return room
  }
  markConnected(roomId: string, playerId: string): Room {
    const room = this.rooms.get(roomId)

    if (!room) {
      throw new Error("Room not found")
    }

    const player = room.players.find((p) => p.playerId === playerId)

    if (!player) {
      throw new Error("Player not found")
    }

    player.isConnected = true

    return room
  }
}
