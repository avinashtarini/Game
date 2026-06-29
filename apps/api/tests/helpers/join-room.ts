import request from "supertest"

import { app } from "../../src/app"

export async function joinRoom(
  roomId: string,
  playerId = "p2",
  displayName = "Player 2",
) {
  const response = await request(app).post(`/rooms/${roomId}/join`).send({
    playerId,
    displayName,
  })

  return response
}
