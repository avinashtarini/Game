import { beforeEach, afterEach, describe, expect, it } from "vitest"
import http from "http"
import { io as Client } from "socket.io-client"

import { app } from "../../src/app"
import { createSocketServer } from "../../src/socket/socket-server"
import { registerSocketHandlers } from "../../src/socket"
import { SocketEvents } from "@game/shared-types"
import request from "supertest"
describe("Room Socket", () => {
  let server: http.Server
  let port: number

  beforeEach(async () => {
    server = http.createServer(app)

    const io = createSocketServer(server)

    registerSocketHandlers(io)

    await new Promise<void>((resolve) => {
      server.listen(0, () => resolve())
    })

    port = (server.address() as any).port
  })

  afterEach(async () => {
    await new Promise<void>((resolve) => {
      server.close(() => resolve())
    })
  })

  it("should connect successfully", async () => {
    const socket = Client(`http://localhost:${port}`)

    await new Promise<void>((resolve) => {
      socket.on("connect", () => {
        expect(socket.connected).toBe(true)

        socket.disconnect()

        resolve()
      })
    })
  })

  it("should emit ROOM_UPDATED when player joins", async () => {
    const createResponse = await request(app).post("/rooms").send({
      playerId: "host-1",
      displayName: "Host",
    })

    const roomId = createResponse.body.roomId

    const socket = Client(`http://localhost:${port}`)

    await new Promise<void>((resolve, reject) => {
      socket.on("connect", () => {
        socket.emit(SocketEvents.ROOM_JOIN, {
          roomId,
          playerId: "player-2",
          displayName: "Player 2",
        })
      })

      socket.on(SocketEvents.ROOM_UPDATED, (event) => {
        try {
          expect(event.room.roomId).toBe(roomId)

          expect(event.room.players.length).toBe(2)

          socket.disconnect()

          resolve()
        } catch (err) {
          reject(err)
        }
      })
    })
  })
})
