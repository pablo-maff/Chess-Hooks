import { useEffect, useState } from "react"
import { initializeBoard } from "../tools"
import Board from "./Board"

const processMove = (move, from, to) => {
  const piece = move[from].piece

  // REMEMBER!!! returns a copy of the object with the specified values changed
  move[from] = {
    ...move[from],
    piece: {
      player: null,
      type: {
        name: null,
        render: null
      }
    },
  }

  move[to] = {
    ...move[to],
    piece,
  }

  return move
}

const Game = () => {
  const [squares, setSquares] = useState([]) 
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setSquares(initializeBoard)
  }, [])

  // if contains a piece select square then select another square to move the piece
  const movePiece = (squareId, from = selected[0], to = selected[1]) => {
    const currentBoard = [...squares]
    if (selected.length < 2) setSelected(selected.concat(squareId))

    // if array is full, make move and clear state
    
    // Next TODO make the move after 2 clicks, not 3 like now and add movement rules
    if (selected.length === 2) {
      setSquares(processMove(currentBoard, from, to))
      setSelected([])
    } 
  }

  
  return (
     <div className="game-board">
       <Board 
         squares={squares}
         selectSquare={movePiece}
       />
     </div>
  )
}

export default Game