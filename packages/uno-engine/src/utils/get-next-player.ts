import { Player } from "@game/shared-types"

export function getNthNextPlayerId(
  players: Player[],
  currentPlayerId: string,
  direction: 1 | -1,
  steps: number,
): string {
  const currentIndex = players.findIndex((p) => p.playerId === currentPlayerId)

  const nextIndex =
    (currentIndex + direction * steps + players.length * 10) % players.length

  return players[nextIndex].playerId
}
