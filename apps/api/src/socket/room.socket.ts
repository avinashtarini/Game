import { Server, Socket } from "socket.io"
import { roomManager } from "../game-manager"
import {
  RoomJoinEvent,
  RoomUpdatedEvent,
  SocketErrorEvent,
  SocketEvents,
  RoomLeaveEvent,
} from "@game/shared-types"

const socketPlayers = new Map<
  string,
  {
    roomId: string
    playerId: string
  }
>()

export function registerRoomHandlers(io: Server, socket: Socket) {
  socket.on(SocketEvents.ROOM_JOIN, (payload: RoomJoinEvent) => {
    try {
      const room = roomManager.joinRoom(payload.roomId, {
        playerId: payload.playerId,
        displayName: payload.displayName,
        isHost: false,
        isConnected: true,
      })

      socket.join(payload.roomId)
      const event: RoomUpdatedEvent = {
        room,
      }
      socketPlayers.set(socket.id, {
        roomId: payload.roomId,
        playerId: payload.playerId,
      })

      io.to(payload.roomId).emit(SocketEvents.ROOM_UPDATED, event)
    } catch (error) {
      const errorEvent: SocketErrorEvent = {
        message: error instanceof Error ? error.message : "Unknown error",
        code: "INTERNAL_ERROR",
      }
      socket.emit(SocketEvents.ROOM_ERROR, errorEvent)
    }
  })
  socket.on(SocketEvents.ROOM_LEAVE, (payload: RoomLeaveEvent) => {
    try {
      const room = roomManager.leaveRoom(payload.roomId, payload.playerId)

      socket.leave(payload.roomId)

      io.to(payload.roomId).emit(SocketEvents.ROOM_UPDATED, {
        room,
      })
    } catch (error) {
      const errorEvent: SocketErrorEvent = {
        message: error instanceof Error ? error.message : "Unknown error",
        code: "INTERNAL_ERROR",
      }
      socket.emit(SocketEvents.ROOM_ERROR, errorEvent)
    }
  })
  socket.on("disconnect", () => {
    const playerInfo = socketPlayers.get(socket.id)

    if (!playerInfo) {
      return
    }

    try {
      const room = roomManager.markDisconnected(
        playerInfo.roomId,
        playerInfo.playerId,
      )

      io.to(playerInfo.roomId).emit(SocketEvents.ROOM_UPDATED, {
        room,
      })

      socketPlayers.delete(socket.id)
    } catch {
      socketPlayers.delete(socket.id)
    }
  })
}
