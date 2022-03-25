import { range } from "../tools";
import { isDestOccupied, isEnemyPiece, isPathClean } from "./helpers";

export const isPawnMovePossible = (
  from, to,
  playerInOrigin,
  playerInDestination,
  pieceInDestination,
  board) => {

  // TODO define en passant rules after defining the turns system
  // TODO define promotion rules

  const initialPawnPositions = {
    white: range(8, 48),
    black: range(8, 8)
  }

  const whiteInitialPath = [from - 8]
  const blackInitialPath = [from + 8]

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
    // if in the last row there is no piece on the front diagonal sides
    // it can only move forward if the square is empty
}

  if (playerInOrigin === 'white') {
    if (((to === from - 8) || 
      (to === from - 16 && initialPawnPositions[playerInOrigin].includes(from)))
      && isPathClean(board, whiteInitialPath) && !isDestOccupied(pieceInDestination)) {
      return true
    }
    else if ((to === from - 7 || to === from - 9) &&
    isEnemyPiece(playerInOrigin, playerInDestination) && isDestOccupied(pieceInDestination)) {
      return true
    }
  }

  if (playerInOrigin === 'black') {
    if (((to === from + 8) ||
    (to === from + 16 && initialPawnPositions[playerInOrigin].includes(from)))
     && isPathClean(board, blackInitialPath) && !isDestOccupied(pieceInDestination)) {
      return true
    }
    else if ((to === from + 7 || to === from + 9) &&
    isEnemyPiece(playerInOrigin, playerInDestination) && isDestOccupied()) {
      return true
    }
  }
  return false
}