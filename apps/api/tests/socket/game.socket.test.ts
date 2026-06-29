import { beforeEach, afterEach, describe, expect, it } from "vitest"
import request from "supertest"
import http from "http"
import { io as Client } from "socket.io-client"

import { app } from "../../src/app"
import { createSocketServer } from "../../src/socket/socket-server"
import { registerSocketHandlers } from "../../src/socket"

import { SocketEvents } from "@game/shared-types"

describe("Game Socket", () => {
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

  it("should emit GAME_STATE when game starts", async () => {
    const createRoomResponse = await request(app).post("/rooms").send({
      playerId: "host",
      displayName: "Host",
    })

    const roomId = createRoomResponse.body.roomId

    const socket = Client(`http://localhost:${port}`)

    await new Promise<void>((resolve, reject) => {
      socket.on("connect", () => {
        socket.emit(SocketEvents.ROOM_JOIN, {
          roomId,
          playerId: "player-2",
          displayName: "Player 2",
        })
      })

      socket.on(SocketEvents.ROOM_UPDATED, () => {
        socket.emit(SocketEvents.GAME_START, {
          roomId,
        })
      })

      socket.on(SocketEvents.GAME_STATE, (event) => {
        try {
          expect(event.game.roomId).toBe(roomId)

          expect(event.game.gameId).toBeDefined()

          socket.disconnect()

          resolve()
        } catch (err) {
          reject(err)
        }
      })

      socket.on(SocketEvents.GAME_ERROR, (error) => {
        reject(new Error(error.message))
      })
    })
  })
})
