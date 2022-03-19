import { useState } from "react"
import { initializeBoard } from "../tools"
import Board from "./Board"

const Game = () => {
  const [squares] = useState(initializeBoard())
  
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