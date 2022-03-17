import { useState } from "react"
import Board from "./Board"

const Game = () => {
  const [squares, setSquares] = useState(Array(64).fill(null))
  
  return (
    <div className="game-board">
      <Board 
        squares={squares}
        onClick={null}
      />
    </div>
  )
}

export default Game