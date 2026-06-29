import request from "supertest"
import { describe, expect, it } from "vitest"

import { app } from "../src/app"
import { createRoom } from "./helpers/create-room"
import { joinRoom } from "./helpers/join-room"

describe("Room API", () => {
  it("should create a room", async () => {
    const response = await request(app).post("/rooms").send({
      playerId: "p1",
      displayName: "Avinash",
    })

    expect(response.status).toBe(201)

    expect(response.body.roomId).toBeDefined()

    expect(response.body.players).toHaveLength(1)

    expect(response.body.players[0].playerId).toBe("p1")
  })

  it("should get room by id", async () => {
    const createResponse = await createRoom()

    const roomId = createResponse.roomId

    const response = await request(app).get(`/rooms/${roomId}`)

    expect(response.status).toBe(200)

    expect(response.body.roomId).toBe(roomId)
  })

  it("should return 404 for unknown room", async () => {
    const response = await request(app).get("/rooms/unknown-room")

    expect(response.status).toBe(404)
  })

  it("should join room", async () => {
    const room = await createRoom()

    const response = await joinRoom(room.roomId, "p2", "Player 2")

    expect(response.status).toBe(200)

    expect(response.body.players).toHaveLength(2)
  })
  it("should reject duplicate player join", async () => {
    const room = await createRoom()

    await joinRoom(room.roomId, "p2", "Player 2")

    const response = await joinRoom(room.roomId, "p2", "Player 2")

    expect(response.status).toBe(409)
  })
  it("should reject joining after game started", async () => {
    const room = await createRoom()

    await joinRoom(room.roomId)

    await request(app).post(`/games/rooms/${room.roomId}/start`)

    const response = await joinRoom(room.roomId, "late-player", "Late Player")

    expect(response.status).toBe(409)
  })
})
