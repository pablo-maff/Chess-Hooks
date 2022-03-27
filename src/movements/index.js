import { isPawnMovePossible } from "./pawn";
import { isKnightMovePossible } from "./knight";
import { isEnemyPiece } from "./helpers";
import { isRookMovePossible } from "./rook";
import { isBishopMovePossible } from "./bishop";
import { isQueenMovePossible } from "./queen";
import { isKingMovePossible } from "./king";

// TODO fix bug of square 0, pieces can't move there and the rook can only get out 
// if is going to destroy a white piece
export const isMovePossible = (board, from, to, turn, checkMate) => {
  if (!board || !to || checkMate) return false
  
  const pieceInOrigin = board[from].piece.type
  const pieceInDestination = board[to].piece.type
  const playerInOrigin = board[from].piece.player
  const playerInDestination = board[to].piece.player

  if (playerInOrigin === turn && isEnemyPiece(playerInOrigin, playerInDestination)) {
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

    else if (pieceInOrigin === 'queen') {
      return isQueenMovePossible(from, to, board)
    }

    else if (pieceInOrigin === 'king') {
      return isKingMovePossible(from, to)
    }
  }
}