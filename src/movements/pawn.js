import { enPassant, range } from '../tools'
import { isDestOccupied, isPathClean } from './helpers'

export const isPawnMovePossible = (
  from, to,
  player,
  board, movesHistory) => {

  const pieceInDestination = to && board[to].piece ? board[to].piece.type : null

  const initialPawnPositions = {
    white: range(8, 48),
    black: range(8, 8)
  }

  const enPassantAllowed = enPassant(board, player, movesHistory)
  const validMove = Math.abs(from - to)
  const initialPath = player === 'white' ? [from - 8] : [from + 8]
  const forbiddenMoves = [[55, 48], [47, 40], [39, 32], [31, 24], [23, 16], [15, 8],
    [15, 24], [23, 32], [31, 40], [39, 48], [47, 56], [8, 15], [16, 23], [24, 31],
    [32, 39], [40, 47], [48, 55], [48, 39], [40, 31], [32, 23], [24, 15], [16, 7]]

  const isForbidden = forbiddenMoves.some(move =>
    move[0] === from && move[1] === to)

  if (isForbidden) return false

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