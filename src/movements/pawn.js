import { range } from "../tools";
import { isDestOccupied, isPathClean } from "./helpers";

export const isPawnMovePossible = (
  from, to,
  playerInOrigin,
  pieceInDestination,
  board) => {

  // TODO define en passant rules after defining the turns system
  // WRITE the extra tests before implementing it!

  const initialPawnPositions = {
    white: range(8, 48),
    black: range(8, 8)
  }

  const whiteInitialPath = [from - 8]
  const blackInitialPath = [from + 8]

  // TODO implement the logic for promotion
  const pawnPromotion = () => {
    const promotionRow = {
      white: range(8, 0),
      black: range(8, 56)
    }

    const possiblePieces = {
      white: ['♕', '♗', '♘', '♖'],
      black: ['♛', '♝', '♞' ,'♜']
    }
    // if pawn reaches last row, prompt player to choose a piece for promotion
    // if in the last row there is no piece on the forward diagonal sides
    // it can only move straightforward if the square is empty
}

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
    else if ((to === from + 7 || to === from + 9) && isDestOccupied()) {
      return true
    }
  }
  return false
}