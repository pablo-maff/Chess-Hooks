import { useState } from "react"
import { initializeBoard, processMove } from "../tools"
import { isMovePossible } from "../movements"
import Board from "./Board"

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