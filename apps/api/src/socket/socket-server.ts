import { Server as HttpServer } from "http"
import { Server } from "socket.io"
export function createSocketServer(server: HttpServer) {
  return new Server(server, {
    cors: {
      origin: "*",
    },
  })
}
