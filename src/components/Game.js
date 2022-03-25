import { useState } from "react"
import { initializeBoard, processMove } from "../tools"
import Board from "./Board"

const range = (size, startAt = 0) =>
  [...Array(size).keys()].map(i => i + startAt);


const isMovePossible = (board, from, to) => {
  const pieceInOrigin = board[from].piece.type
  const pieceInDestination = board[to].piece.type
  const playerInOrigin = board[from].piece.player
  const playerInDestination = board[to].piece.player

  const isDestOccupied = () => {
    if (pieceInDestination === null) {
      return false
    }
    return true
  }
  
  // If piece is not a knight, it can't jump over other pieces!
  // This implementation works for pawns, for other pieces it will need to iterate over the full path
  const isPathClean = (path) => {
    if (board[path].piece.type === null) {
      return true
    }
    return false 
  }

  const isEnemyPiece = () => {
    if (playerInOrigin !== playerInDestination) return true
    
    return false
  }

  const isPawnMovePossible = () => {
    const initialPawnPositions = {
      'white': range(8, 48),
      'black': range(8, 8)
    }

    const whiteInitialPath = [from - 8]
    const blackInitialPath = [from + 8]

    // NEXT TODO WRITE TESTS for movements of all pieces!
    if (playerInOrigin === 'white') {
      if (((to === from - 8) || 
        (to === from - 16 && initialPawnPositions[playerInOrigin].includes(from)))
        && isPathClean(whiteInitialPath) && !isDestOccupied()) {
        return true
      }
      else if ((to === from - 7 || to === from - 9) && isEnemyPiece() && isDestOccupied()) {
        return true
      }
    }

    if (playerInOrigin === 'black') {
      if (((to === from + 8) ||
      (to === from + 16 && initialPawnPositions[playerInOrigin].includes(from)))
       && isPathClean(blackInitialPath) && !isDestOccupied()) {
        return true
      }
      else if ((to === from + 7 || to === from + 9) && isEnemyPiece() && isDestOccupied()) {
        return true
      }
    }
    return false
  }

  if (pieceInOrigin === 'pawn') {
    return isPawnMovePossible()

  }
  // TODO: Define movement rules of the rest of the pieces
}

const Game = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selected, setSelected] = useState([])

  // Move piece
  // TODO Make this and movePiece more readable.
  if (selected.length === 2) {
    const from = selected[0]
    const to = selected[1]
    if (isMovePossible(board, from, to)) {
      setBoard(processMove(board, from, to))
      setSelected([])
    }
    else setSelected([])
  }
  // if contains a piece select square then select another square to move the piece
  const movePiece = (boardId, from = selected[0]) => {
    if (selected.length < 2) {
      // select to
      if (from) {
        setSelected(selected.concat(boardId))
      }
      // select from
      else if (board[boardId].piece.type !== null) {
        setSelected(selected.concat(boardId))
      }
    }
  }

  return (
    <div className="game-board">
      <Board
        board={board}
        selectSquare={movePiece}
      />
    </div>
  )
}

export default Game