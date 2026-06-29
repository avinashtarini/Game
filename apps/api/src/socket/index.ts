import { Server } from "socket.io"

import { registerRoomHandlers } from "./room.socket"
import { registerGameHandlers } from "./game.socket"

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket) => {
    console.log("connected", socket.id)

    registerRoomHandlers(io, socket)

    registerGameHandlers(io, socket)
  })
}
