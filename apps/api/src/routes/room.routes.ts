import { Router } from "express"

import { createRoom, getRoom, joinRoom } from "../controllers/room.controller"

export const roomRouter: Router = Router()

roomRouter.post("/", createRoom)

roomRouter.get("/:roomId", getRoom)

roomRouter.post("/:roomId/join", joinRoom)
