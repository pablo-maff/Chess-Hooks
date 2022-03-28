import { isSameRow } from "./helpers"

export const isKnightMovePossible = (from, to) => {
  const forbiddenMoves = [[40, 23], [23, 40], [16, 31], [31, 16], [49, 39], [40, 30], [57, 47], [56, 46], [33, 23], [17, 7], [16, 6], [39, 49], [30, 40], [47, 57], [46, 56], [23, 33], [7, 17], [6, 16]]
  const possibleMoves =
    (from - 17 === to && !isSameRow(from, to)) || // BUG 40 to 23
    (from - 10 === to && !isSameRow(from, to)) || // BUG 49 to 39, 40 to 30, 57 to 47, 56 to 46, 33 to 23, 17 to 7, 16 to 6
    (from + 6 === to && !isSameRow(from, to)) ||
    (from + 15 === to && !isSameRow(from, to)) || // BUG 16 to 31
    (from - 15 === to && !isSameRow(from, to)) || // BUG 31 to 16
    (from - 6 === to && !isSameRow(from, to)) ||
    (from + 10 === to && !isSameRow(from, to)) || // BUG 39 to 49, 30 to 40, 47 to 57, 46 to 56, 23 to 33, 7 to 17, 6 to 16
    (from + 17 === to && !isSameRow(from, to))  // BUG 23 to 40

  const isForbidden = forbiddenMoves.some(move => 
    move[0] === from && move[1] === to)

  if (isForbidden) return false
  
  return possibleMoves
}