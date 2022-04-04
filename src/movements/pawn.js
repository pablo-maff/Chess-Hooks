import { enPassant, range } from "../tools";
import { isDestOccupied, isPathClean } from "./helpers";

export const isPawnMovePossible = (
  from, to,
  player,
  board, movesHistory) => {

  const pieceInDestination = board[to]?.piece?.type

  const initialPawnPositions = {
    white: range(8, 48),
    black: range(8, 8)
  }

  const enPassantAllowed = enPassant(board, player, movesHistory)
  const validMove = Math.abs(from - to)
  const initialPath = player === 'white' ? [from - 8] : [from + 8]

  if (enPassantAllowed.length && from === enPassantAllowed[0] && to === enPassantAllowed[1]) {
    return true
  }

  if (((validMove === 8) && !isDestOccupied(pieceInDestination)) || 
    ((validMove === 16 && initialPawnPositions[player].includes(from))
    && isPathClean(board, initialPath) && !isDestOccupied(pieceInDestination))) {
    return true
    }

  if ((validMove === 7 || validMove === 9) && isDestOccupied(pieceInDestination)) {
    return true
  }

  return false
}