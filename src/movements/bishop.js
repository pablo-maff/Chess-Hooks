import { isPathClean, isSameDiagonal } from "./helpers"

export const isBishopMovePossible = (from, to, board) => {
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

    if(Math.abs(from - to) % 9 === 0) {
      incrementBy = 9
      pathStart += 9
    }
    else {
      incrementBy = 7
      pathStart += 7
    }

    for (let i = pathStart; i < pathEnd; i += incrementBy) {
      path.push(i)
    }

    return path
  }

  return isPathClean(board, getPath()) && isSameDiagonal(from, to)
}