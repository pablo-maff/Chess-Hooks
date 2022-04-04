import { enPassant, range } from "../tools";
import { isDestOccupied, isPathClean } from "./helpers";

export const isPawnMovePossible = (
  from, to,
  player,
  board, movesHistory) => {
  // NEXT TODO define en passant rules after defining the turns system
  // WRITE the extra tests before implementing it!

  const pieceInDestination = board[to]?.piece?.type

  const initialPawnPositions = {
    white: range(8, 48),
    black: range(8, 8)
  }

  const whiteInitialPath = [from - 8]
  const blackInitialPath = [from + 8]

  const enPassantAllowed = enPassant(board, player, movesHistory)



  if (enPassantAllowed.length && from === enPassantAllowed[0] && to === enPassantAllowed[1]) {
    return true
  }

  if (player === 'white') {
    if (((to === from - 8) && !isDestOccupied(pieceInDestination)) || 
      ((to === from - 16 && initialPawnPositions[player].includes(from))
      && isPathClean(board, whiteInitialPath) && !isDestOccupied(pieceInDestination))) {
      return true
    }
    else if ((to === from - 7 || to === from - 9) && isDestOccupied(pieceInDestination)) {
      return true
    }
  }

  else if (player === 'black') {
    if (((to === from + 8) && !isDestOccupied(pieceInDestination)) ||
    ((to === from + 16 && initialPawnPositions[player].includes(from))
     && isPathClean(board, blackInitialPath) && !isDestOccupied(pieceInDestination))) {
      return true
    }
    else if ((to === from + 7 || to === from + 9) && isDestOccupied(pieceInDestination)) {
      return true
    }
  }
  return false
}