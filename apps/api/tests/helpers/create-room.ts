import request from "supertest"

import { app } from "../../src/app"

export async function createRoom(playerId = "host", displayName = "Host") {
  const response = await request(app).post("/rooms").send({
    playerId,
    displayName,
  })

  return response.body
}
