import { Server, Socket } from "socket.io"
import { gameManager, roomManager } from "../game-manager"
import { randomUUID } from "node:crypto"
import {
  GameMoveEvent,
  GameStateEvent,
  GameStartEvent,
  SocketErrorEvent,
  SocketEvents,
} from "@game/shared-types"

export function registerGameHandlers(io: Server, socket: Socket) {
  socket.on(SocketEvents.GAME_START, ({ roomId, playerId }: GameStartEvent) => {
    try {
      const room = roomManager.getRoom(roomId)

      if (!room) {
        throw new Error("Room not found")
      }

      if (room.hostPlayerId !== playerId) {
        throw new Error("Only host can start game")
      }

      const gameId = randomUUID()

      const game = gameManager.createGame(gameId, room.roomId, room.players)

      roomManager.startGame(roomId, gameId)
      const event: GameStateEvent = {
        game,
      }
      io.to(roomId).emit(SocketEvents.GAME_STATE, event)
    } catch (error) {
      socket.emit(SocketEvents.GAME_ERROR, {
        message: error instanceof Error ? error.message : "Unknown error",
        code: "GAME_START_FAILED",
      })
    }
  })
  socket.on(SocketEvents.GAME_MOVE, (payload: GameMoveEvent) => {
    try {
      const result = gameManager.processMove(payload.gameId, payload.move)
      if (!result.success) {
        socket.emit(SocketEvents.GAME_ERROR, {
          message: result.error,
        })

        return
      }
      const game = result.state!
      const event: GameStateEvent = {
        game,
      }
      io.to(game.roomId).emit(SocketEvents.GAME_STATE, event)
    } catch (error) {
      const errorEvent: SocketErrorEvent = {
        message: error instanceof Error ? error.message : "Unknown error",
        code: "INTERNAL_ERROR",
      }

      socket.emit(SocketEvents.GAME_ERROR, errorEvent)
    }
  })
}
