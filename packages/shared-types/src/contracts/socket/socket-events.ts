export const SocketEvents = {
  ROOM_CREATE: "room:create",
  ROOM_JOIN: "room:join",
  ROOM_ERROR: "room:error",
  ROOM_UPDATED: "room:updated",
  ROOM_LEAVE: "room:leave",

  GAME_START: "game:start",
  GAME_STATE: "game:state",
  GAME_MOVE: "game:move",
  GAME_ERROR: "game:error",
  MOVE_MADE: "move:made",
  GAME_UPDATED: "game:updated",
  ERROR: "error",
} as const
