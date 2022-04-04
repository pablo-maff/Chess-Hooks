import { isPawnMovePossible } from "./pawn";
import { isKnightMovePossible } from "./knight";
import { isEnemyPiece } from "./helpers";
import { isRookMovePossible } from "./rook";
import { isBishopMovePossible } from "./bishop";
import { isQueenMovePossible } from "./queen";
import { isKingMovePossible } from "./king";
import { getOpponent } from "../tools";

export const isMovePossible = (board, from, to, movesHistory, player, pieceInOrigin) => {
  if (!board) return null
  
  const opponent = getOpponent(player)

  if (isEnemyPiece(player, opponent)) {
    if (pieceInOrigin === 'pawn') {
      return isPawnMovePossible(
        from, to,
        player,
        board,
        movesHistory,
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