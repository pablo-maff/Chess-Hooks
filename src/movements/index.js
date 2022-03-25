import { isPawnMovePossible } from "./pawn";
import { isKnightMovePossible } from "./knight";

export const isMovePossible = (board, from, to) => {
  const pieceInOrigin = board[from].piece.type
  const pieceInDestination = board[to].piece.type
  const playerInOrigin = board[from].piece.player
  const playerInDestination = board[to].piece.player

  const isDestOccupied = () => {
    if (pieceInDestination === null) {
      return false
    }
    return true
  }
  
  // If piece is not a knight, it can't jump over other pieces!
  // This implementation works for pawns, for other pieces it will need to iterate over the full path
  const isPathClean = (path) => {
    if (board[path].piece.type === null) {
      return true
    }
    return false 
  }

  const isEnemyPiece = () => {
    if (playerInOrigin !== playerInDestination) return true
    
    return false
  }

  if (pieceInOrigin === 'pawn') {
    return isPawnMovePossible(
      from, to,
      playerInOrigin,
      isPathClean,
      isDestOccupied,
      isEnemyPiece)
  }

  else if (pieceInOrigin === 'knight') {
    return isKnightMovePossible(
      from, to,
      playerInOrigin,
      isDestOccupied,
      isEnemyPiece
    )
  }


  // TODO: Define movement rules of the rest of the pieces
}