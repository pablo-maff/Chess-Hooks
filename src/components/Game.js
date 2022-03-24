import { useEffect, useState } from "react"
import { initializeBoard, processMove } from "../tools"
import Board from "./Board"

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

const isMovePossible = (board, from, to) => {
  const piece = board[from].piece
  const destinationObj = board[to].piece.type

  const isToOccupied = () => {
    if (destinationObj === null) {
      return false
    }
    return true
  }

  if (piece.type === 'pawn') {
    const initialPawnPositions = {
      'white': range(8, 48),
      'black': range(8, 8)
    }

    if ((to === from - 8 && !isToOccupied()) || (to === from - 16 && initialPawnPositions['white'].indexOf(from) !== -1 && !isToOccupied())) {
      return true
    }
    
    else if ((to === from + 8 && !isToOccupied()) || (to === from + 16 && initialPawnPositions['black'].indexOf(from) !== -1 && !isToOccupied())) {
      return true
    }
  }
}

const Game = () => {
  const [board, setBoard] = useState([]) 
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setBoard(initializeBoard)
  }, [])

  // Move piece
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
  const movePiece = (boardId, from = selected[0], to = selected[1]) => {
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