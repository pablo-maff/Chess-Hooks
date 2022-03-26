import { isSameDiagonal, isSameRow } from "./helpers"

export const isKingMovePossible = (from, to) => {
  const possibleMoves = 
    (from - 9 === to && isSameDiagonal(from, to)) ||
    from - 8 === to ||
    (from - 7 === to && isSameDiagonal(from, to)) ||
    (from - 1 === to && isSameRow(from, to)) ||
    (from + 9 === to && isSameDiagonal(from, to)) ||
    from + 8 === to ||
    (from + 7 === to && isSameDiagonal(from, to)) ||
    (from + 1 === to && isSameRow(from, to))
  
  return possibleMoves
}