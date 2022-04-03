import { isPawnMovePossible } from "./pawn";
import { isKnightMovePossible } from "./knight";
import { isEnemyPiece } from "./helpers";
import { isRookMovePossible } from "./rook";
import { isBishopMovePossible } from "./bishop";
import { isQueenMovePossible } from "./queen";
import { isKingMovePossible } from "./king";

export const isMovePossible = (board, from, to) => {
  if (!board) return null
  
  const pieceInOrigin = board[from]?.piece?.type
  const pieceInDestination = board[to]?.piece?.type
  const playerInOrigin = board[from]?.piece?.player
  const playerInDestination = board[to]?.piece?.player


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

    else if (pieceInOrigin === 'queen') {
      return isQueenMovePossible(from, to, board)
    }

    else if (pieceInOrigin === 'king') {
      return isKingMovePossible(from, to)
    }
  }
}