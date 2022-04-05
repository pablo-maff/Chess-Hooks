import { isPathClean, isSameColumn, isSameDiagonal, isSameRow } from './helpers'

export const isQueenMovePossible = (from, to, board) => {
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

    if (Math.abs(from - to) % 8 === 0) {
      incrementBy = 8
      pathStart += 8
    }
    else if (Math.abs(from - to) % 9 === 0) {
      incrementBy = 9
      pathStart += 9
    }
    else if (Math.abs(from - to) % 7 === 0) {
      incrementBy = 7
      pathStart += 7
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

  return isPathClean(board, getPath()) && (isSameDiagonal(from, to) || isSameColumn(from, to) || isSameRow(from, to))
}