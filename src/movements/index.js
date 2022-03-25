import { isPawnMovePossible } from "./pawn";
import { isKnightMovePossible } from "./knight";


export const isMovePossible = (board, from, to) => {
  const pieceInOrigin = board[from].piece.type
  const pieceInDestination = board[to].piece.type
  const playerInOrigin = board[from].piece.player
  const playerInDestination = board[to].piece.player
  
  if (pieceInOrigin === 'pawn') {
    return isPawnMovePossible(
      from, to,
      playerInOrigin,
      playerInDestination,
      pieceInDestination,
      board,
      )
  }

  else if (pieceInOrigin === 'knight') {
    return isKnightMovePossible(
      from, to,
      playerInOrigin,
      pieceInDestination,
    )
  }

  // TODO: Define movement rules of the rest of the pieces
}