import { Card, GameState, Player } from "@game/shared-types"

export function createPlayer(id: string): Player {
  return {
    playerId: id,
    displayName: id,
    isHost: false,
    isConnected: true,
  }
}

export function createCard(
  id: string,
  color: Card["color"],
  value: Card["value"],
): Card {
  return {
    id,
    color,
    value,
  }
}

export function createBaseState(): GameState {
  return {
    gameId: "game-1",
    roomId: "room-1",

    players: [
      createPlayer("p1"),
      createPlayer("p2"),
      createPlayer("p3"),
      createPlayer("p4"),
    ],

    hands: {
      p1: [],
      p2: [],
      p3: [],
      p4: [],
    },

    deck: [],
    discardPile: [],

    currentPlayerId: "p1",

    direction: 1,

    drawStack: 0,

    status: "in_progress",

    createdAt: Date.now(),
    updatedAt: Date.now(),

    activeColor: "red",

    unoPendingPlayerIds: [],
  }
}
