import { range } from "../tools";
import { isDestOccupied, isPathClean } from "./helpers";

export const isPawnMovePossible = (
  from, to,
  playerInOrigin,
  pieceInDestination,
  board) => {

  // NEXT TODO define en passant rules after defining the turns system
  // WRITE the extra tests before implementing it!

  const initialPawnPositions = {
    white: range(8, 48),
    black: range(8, 8)
  }

  const whiteInitialPath = [from - 8]
  const blackInitialPath = [from + 8]

  if (playerInOrigin === 'white') {
    if (((to === from - 8) && !isDestOccupied(pieceInDestination)) || 
      ((to === from - 16 && initialPawnPositions[playerInOrigin].includes(from))
      && isPathClean(board, whiteInitialPath) && !isDestOccupied(pieceInDestination))) {
      return true
    }
    else if ((to === from - 7 || to === from - 9) && isDestOccupied(pieceInDestination)) {
      return true
    }
  }

  if (playerInOrigin === 'black') {
    if (((to === from + 8) && !isDestOccupied(pieceInDestination)) ||
    ((to === from + 16 && initialPawnPositions[playerInOrigin].includes(from))
     && isPathClean(board, blackInitialPath) && !isDestOccupied(pieceInDestination))) {
      return true
    }
    else if ((to === from + 7 || to === from + 9) && isDestOccupied(pieceInDestination)) {
      return true
    }
  }
  return false
}