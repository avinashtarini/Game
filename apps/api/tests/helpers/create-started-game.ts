import request from "supertest"

import { app } from "../../src/app"

import { createRoom } from "./create-room"
import { joinRoom } from "./join-room"

export async function createStartedGame() {
  const room = await createRoom()

  await joinRoom(room.roomId)

  const response = await request(app).post(`/games/rooms/${room.roomId}/start`)

  return response.body
}
