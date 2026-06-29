import http from "http"

import { app } from "./app"
import { createSocketServer } from "./socket/socket-server"
import { registerSocketHandlers } from "./socket"
const PORT = 3000

const server = http.createServer(app)

const io = createSocketServer(server)

registerSocketHandlers(io)

server.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
