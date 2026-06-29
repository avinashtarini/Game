import request from "supertest"
import { describe, expect, it } from "vitest"

import { app } from "../src/app"

describe("Game API", () => {
  it("should start a game", async () => {
    const roomResponse = await request(app).post("/rooms").send({
      playerId: "host",
      displayName: "Host",
    })

    const roomId = roomResponse.body.roomId

    await request(app).post(`/rooms/${roomId}/join`).send({
      playerId: "p2",
      displayName: "Player 2",
    })

    const response = await request(app).post(`/games/rooms/${roomId}/start`)

    expect(response.status).toBe(201)

    expect(response.body.gameId).toBeDefined()

    expect(response.body.players).toHaveLength(2)

    expect(response.body.status).toBe("in_progress")
  })

  it("should get game by id", async () => {
    const roomResponse = await request(app).post("/rooms").send({
      playerId: "host",
      displayName: "Host",
    })

    const roomId = roomResponse.body.roomId

    await request(app).post(`/rooms/${roomId}/join`).send({
      playerId: "p2",
      displayName: "Player 2",
    })

    const startResponse = await request(app).post(
      `/games/rooms/${roomId}/start`,
    )

    const gameId = startResponse.body.gameId

    const response = await request(app).get(`/games/${gameId}`)

    expect(response.status).toBe(200)

    expect(response.body.gameId).toBe(gameId)
  })

  it("should return 404 for unknown game", async () => {
    const response = await request(app).get("/games/unknown-game")

    expect(response.status).toBe(404)

    expect(response.body.message).toBe("Game not found")
  })

  it("should return 404 for unknown room when starting game", async () => {
    const response = await request(app).post("/games/rooms/unknown-room/start")

    expect(response.status).toBe(404)

    expect(response.body.message).toBe("Room not found")
  })

  it("should reject starting a game twice", async () => {
    const roomResponse = await request(app).post("/rooms").send({
      playerId: "host",
      displayName: "Host",
    })

    const roomId = roomResponse.body.roomId

    await request(app).post(`/rooms/${roomId}/join`).send({
      playerId: "p2",
      displayName: "Player 2",
    })

    await request(app).post(`/games/rooms/${roomId}/start`)

    const response = await request(app).post(`/games/rooms/${roomId}/start`)

    expect(response.status).toBe(409)

    expect(response.body.message).toBe("Game already started")
  })
})
