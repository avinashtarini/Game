import { Request, Response } from "express"
import crypto from "node:crypto"
import { roomManager } from "../game-manager"
import {
  CreateRoomRequest,
  JoinRoomRequest,
  RoomResponse,
  ErrorResponse,
} from "@game/shared-types"
interface RoomParams {
  roomId: string
}

export function createRoom(
  req: Request<{}, {}, CreateRoomRequest>,
  res: Response<RoomResponse>,
) {
  const roomId = crypto.randomUUID()
  const body = req.body
  const host = {
    playerId: body.playerId,
    displayName: body.displayName,
    isHost: true,
    isConnected: true,
  }

  const room = roomManager.createRoom(roomId, host)

  res.status(201).json(room)
}

export function getRoom(req: Request<RoomParams>, res: Response) {
  const room = roomManager.getRoom(req.params.roomId)

  if (!room) {
    return res.status(404).json({
      message: "Room not found",
    })
  }

  res.json(room)
}

export function joinRoom(
  req: Request<RoomParams, {}, JoinRoomRequest>,
  res: Response,
) {
  try {
    const body = req.body
    const room = roomManager.joinRoom(req.params.roomId, {
      playerId: body.playerId,
      displayName: body.displayName,
      isHost: false,
      isConnected: true,
    })

    res.json(room)
  } catch (error) {
    if (!(error instanceof Error)) {
      return res.status(500).json({
        message: "Internal server error",
      })
    }

    if (error.message === "Room not found") {
      return res.status(404).json({
        message: error.message,
      })
    }

    if (
      error.message === "Player already joined" ||
      error.message === "Game already started"
    ) {
      return res.status(409).json({
        message: error.message,
      })
    }

    return res.status(500).json({
      message: "Internal server error",
    })
  }
}
