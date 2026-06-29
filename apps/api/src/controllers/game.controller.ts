import { Request, Response } from "express"
import { randomUUID } from "node:crypto"
import { StartGameResponse, ErrorResponse } from "@game/shared-types"
import { gameManager, roomManager } from "../game-manager"

export function startGame(
  req: Request<{ roomId: string }>,
  res: Response<StartGameResponse | ErrorResponse>,
) {
  try {
    const room = roomManager.getRoom(req.params.roomId)

    if (!room) {
      return res.status(404).json({
        message: "Room not found",
      })
    }

    const gameId = randomUUID()

    roomManager.startGame(room.roomId, gameId)

    const game = gameManager.createGame(gameId, room.roomId, room.players)

    return res.status(201).json(game)
  } catch (error) {
    if (error instanceof Error && error.message === "Game already started") {
      return res.status(409).json({
        message: error.message,
      })
    }

    return res.status(500).json({
      message: "Internal server error",
    })
  }
}
export function getGame(
  req: Request<{ gameId: string }>,
  res: Response<StartGameResponse | ErrorResponse>,
) {
  const game = gameManager.getGame(req.params.gameId)

  if (!game) {
    return res.status(404).json({
      message: "Game not found",
    })
  }

  res.json(game)
}
