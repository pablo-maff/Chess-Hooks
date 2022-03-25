import rowDictionary from '../dictionaries/row.json'
import columnDictionary from '../dictionaries/column.json'
import diagonalDictionaryTLBR from '../dictionaries/diagonalTopLeftBottomRight.json'
import diagonalDictionaryTRBL from '../dictionaries/diagonalTopRightBottomLeft.json'

export const isDestOccupied = (pieceInDestination) => {
  if (pieceInDestination === null) {
    return false
  }
  return true
}

export const isEnemyPiece = (playerInOrigin, playerInDestination) => {
  if (playerInOrigin !== playerInDestination) return true
  
  return false
}

// If piece is not a knight, it can't jump over other pieces!
// This implementation works for pawns, for other pieces it will need to iterate over the full path
export const isPathClean = (board, path) => {
  if (board[path].piece.type === null) {
    return true
  }
  return false 
}

export const isSameRow = (from, to) => {
  return !!(rowDictionary[from] && rowDictionary[from][to])
}

export const isSameColumn = (from, to) => {
  return !!(columnDictionary[from] && columnDictionary[from][to]);
}

export const isSameDiagonal = (from, to) => {
  return !!((diagonalDictionaryTLBR[from] && diagonalDictionaryTLBR[from][to]) ||
    (diagonalDictionaryTRBL[from] && diagonalDictionaryTRBL[from][to]))
}