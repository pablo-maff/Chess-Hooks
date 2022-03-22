import { useEffect, useState } from "react"
import { initializeBoard, processMove } from "../tools"
import Board from "./Board"

const Game = () => {
  const [board, setSquares] = useState([]) 
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setSquares(initializeBoard)
  }, [])

  // if contains a piece select square then select another square to move the piece
  const movePiece = (squareId, from = selected[0], to = selected[1]) => {
    if (selected.length < 2) setSelected(selected.concat(squareId))
    
    // if array is full, make move and clear state
    
    // Next TODO make the move after 2 clicks, not 3 like now and add movement rules
    if (selected.length === 2) {
      setSquares(processMove(board, from, to))
      setSelected([])
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