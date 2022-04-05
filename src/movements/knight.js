import { isSameRow } from './helpers'

export const isKnightMovePossible = (from, to) => {
  const forbiddenMoves = [[40, 23], [23, 40], [16, 31], [31, 16], [49, 39], [40, 30], [57, 47], [56, 46], [33, 23], [17, 7], [16, 6], [39, 49], [30, 40], [47, 57], [46, 56], [23, 33], [7, 17], [6, 16]]
  const possibleMoves =
    (from - 17 === to && !isSameRow(from, to)) ||
    (from - 10 === to && !isSameRow(from, to)) ||
    (from + 6 === to && !isSameRow(from, to)) ||
    (from + 15 === to && !isSameRow(from, to)) ||
    (from - 15 === to && !isSameRow(from, to)) ||
    (from - 6 === to && !isSameRow(from, to)) ||
    (from + 10 === to && !isSameRow(from, to)) ||
    (from + 17 === to && !isSameRow(from, to))

  const isForbidden = forbiddenMoves.some(move =>
    move[0] === from && move[1] === to)

  if (isForbidden) return false

  return possibleMoves
}