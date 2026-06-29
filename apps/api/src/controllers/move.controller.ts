import { Request, Response } from "express"
import { MakeMoveRequest, MakeMoveResponse } from "@game/shared-types"

import { gameManager } from "../game-manager"

interface Params {
  gameId: string
}

export function makeMove(
  req: Request<Params, {}, MakeMoveRequest>,
  res: Response<MakeMoveResponse>,
) {
  const move = req.body

  const result = gameManager.processMove(req.params.gameId, move)

  if (!result.success) {
    return res.status(400).json(result)
  }

  res.json(result)
}
