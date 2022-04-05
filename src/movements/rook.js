import { isSameRow, isSameColumn, isPathClean } from './helpers'

// BUG Rook in square 0 can't move unless is destroying another piece
export const isRookMovePossible = (from, to, board) => {
  const getPath = () => {
    const path = []
    let pathStart, pathEnd, incrementBy

    if (from > to) {
      pathStart = to
      pathEnd = from
    }
    else {
      pathStart = from
      pathEnd = to
    }

    if (Math.abs(to - from) % 8 === 0) {
      incrementBy = 8
      pathStart += 8
    }
    else {
      incrementBy = 1
      pathStart += 1
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i)
    }

    return path
  }

  return isPathClean(board, getPath()) && (isSameColumn(from, to) || isSameRow(from, to))
}