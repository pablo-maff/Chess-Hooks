import { isPawnMovePossible } from "./pawn";
import { isKnightMovePossible } from "./knight";
import { isEnemyPiece } from "./helpers";
import { isRookMovePossible } from "./rook";
import { isBishopMovePossible } from "./bishop";


export const isMovePossible = (board, from, to) => {
  if (!board || !to) return false
  
  const pieceInOrigin = board[from].piece.type
  const pieceInDestination = board[to].piece.type
  const playerInOrigin = board[from].piece.player
  const playerInDestination = board[to].piece.player

  if (isEnemyPiece(playerInOrigin, playerInDestination)) {
    if (pieceInOrigin === 'pawn') {
      return isPawnMovePossible(
        from, to,
        playerInOrigin,
        pieceInDestination,
        board
        )
    }

    else if (pieceInOrigin === 'knight') {
      return isKnightMovePossible(from, to)
    }

    else if (pieceInOrigin === 'rook') {
      return isRookMovePossible(from, to, board)
    }

    else if (pieceInOrigin === 'bishop') {
      return isBishopMovePossible(from, to, board)
    }
  }
  // TODO: Define movement rules of the rest of the pieces
}