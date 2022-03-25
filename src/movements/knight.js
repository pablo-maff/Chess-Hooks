import { isSameRow } from "./helpers"

// TODO NEXT it has to destroy only enemy pieces
export const isKnightMovePossible = (
  from, to, playerInOrigin, playerInDestination) => {
  const possibleMoves = 
    (from - 17 === to && !isSameRow(from, to)) ||
    (from - 10 === to && !isSameRow(from, to)) ||
    (from + 6 === to && !isSameRow(from, to))  ||
    (from + 15 === to && !isSameRow(from, to)) ||
    (from - 15 === to && !isSameRow(from, to)) ||
    (from - 6 === to && !isSameRow(from, to))  ||
    (from + 10 === to && !isSameRow(from, to)) ||
    (from + 17 === to && !isSameRow(from, to))
  
  return possibleMoves
}