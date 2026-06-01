export function cleanupExpiredUno(
  pendingPlayerIds: string[],
  nextPlayerId: string,
): string[] {
  return pendingPlayerIds.filter((id) => id !== nextPlayerId)
}
