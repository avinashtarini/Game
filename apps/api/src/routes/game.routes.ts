import { Router } from "express"
import { getGame, startGame } from "../controllers/game.controller"

export const gameRouter: Router = Router()

gameRouter.post("/rooms/:roomId/start", startGame)

gameRouter.get("/:gameId", getGame)
