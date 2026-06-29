import { GameState, Move, Player, MoveResult } from "@game/shared-types"
import { processMove, startGame } from "@game/uno-engine"

export class GameManager {
  private games = new Map<string, GameState>()
  private roomToGame = new Map<string, string>()

  createGame(gameId: string, roomId: string, players: Player[]): GameState {
    if (players.length < 2) {
      throw new Error("At least 2 players required")
    }
    const game = startGame(gameId, roomId, players)

    this.games.set(gameId, game)
    this.roomToGame.set(roomId, gameId)

    return game
  }

  getGame(gameId: string): GameState | undefined {
    return this.games.get(gameId)
  }

  processMove(gameId: string, move: Move): MoveResult {
    const game = this.games.get(gameId)

    if (!game) {
      return {
        success: false,
        error: "Game not found",
      }
    }

    const result = processMove(game, move)

    if (result.success && result.state) {
      this.games.set(gameId, result.state)
    }

    return result
  }

  getGameByRoomId(roomId: string): GameState | undefined {
    const gameId = this.roomToGame.get(roomId)

    if (!gameId) {
      return undefined
    }

    return this.games.get(gameId)
  }
}
