import request from "supertest"
import { describe, expect, it } from "vitest"

import { app } from "../src/app"

async function createStartedGame() {
  const roomResponse = await request(app).post("/rooms").send({
    playerId: "p1",
    displayName: "Player 1",
  })

  const roomId = roomResponse.body.roomId

  await request(app).post(`/rooms/${roomId}/join`).send({
    playerId: "p2",
    displayName: "Player 2",
  })

  const gameResponse = await request(app).post(`/games/rooms/${roomId}/start`)

  return gameResponse.body
}

describe("Move API", () => {
  it("should draw a card", async () => {
    const game = await createStartedGame()

    const response = await request(app)
      .post(`/games/${game.gameId}/moves`)
      .send({
        type: "draw_card",
        gameId: game.gameId,
        playerId: game.currentPlayerId,
        timestamp: Date.now(),
      })

    expect(response.status).toBe(200)

    expect(response.body.success).toBe(true)

    expect(response.body.state).toBeDefined()
  })

  it("should reject move for unknown game", async () => {
    const response = await request(app).post("/games/unknown-game/moves").send({
      type: "draw_card",
      gameId: "unknown-game",
      playerId: "p1",
      timestamp: Date.now(),
    })

    expect(response.status).toBe(400)

    expect(response.body.success).toBe(false)
  })

  it("should reject move from wrong player", async () => {
    const game = await createStartedGame()

    const response = await request(app)
      .post(`/games/${game.gameId}/moves`)
      .send({
        type: "draw_card",
        gameId: game.gameId,
        playerId: "not-current-player",
        timestamp: Date.now(),
      })

    expect(response.status).toBe(400)

    expect(response.body.success).toBe(false)
  })

  it("should play a valid card", async () => {
    const game = await createStartedGame()

    const playerId = game.currentPlayerId

    const card = game.hands[playerId].find(
      (c: any) =>
        c.color === game.activeColor ||
        c.value === game.discardPile.at(-1).value ||
        c.color === "wild",
    )

    expect(card).toBeDefined()

    const response = await request(app)
      .post(`/games/${game.gameId}/moves`)
      .send({
        type: "play_card",
        gameId: game.gameId,
        playerId,
        cardId: card.id,
        chosenColor: "red",
        timestamp: Date.now(),
      })

    expect(response.status).toBe(200)

    expect(response.body.success).toBe(true)
  })

  it("should reject invalid card play", async () => {
    const game = await createStartedGame()

    const playerId = game.currentPlayerId

    const response = await request(app)
      .post(`/games/${game.gameId}/moves`)
      .send({
        type: "play_card",
        gameId: game.gameId,
        playerId,
        cardId: "fake-card-id",
        timestamp: Date.now(),
      })

    expect(response.status).toBe(400)

    expect(response.body.success).toBe(false)
  })
})
