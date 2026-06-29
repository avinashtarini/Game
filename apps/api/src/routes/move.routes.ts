import { Router } from "express"

import { makeMove } from "../controllers/move.controller"

export const moveRouter: Router = Router()

moveRouter.post("/:gameId/moves", makeMove)
