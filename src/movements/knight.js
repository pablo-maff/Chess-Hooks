import { isSameRow } from "./helpers"

// TODO Fix edge cases bugs
export const isKnightMovePossible = (from, to) => {
  const possibleMoves = 
    (from - 17 === to && !isSameRow(from, to)) || // BUG 40 to 23
    (from - 10 === to && !isSameRow(from, to)) || // BUG 40 to 30
    (from + 6 === to && !isSameRow(from, to))  ||
    (from + 15 === to && !isSameRow(from, to)) || // BUG 16 to 31
    (from - 15 === to && !isSameRow(from, to)) || // BUG 31 to 16
    (from - 6 === to && !isSameRow(from, to))  ||
    (from + 10 === to && !isSameRow(from, to)) || // BUG 30 to 40
    (from + 17 === to && !isSameRow(from, to))  // BUG 23 to 40
  
  return possibleMoves
}