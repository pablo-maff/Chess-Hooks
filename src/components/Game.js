import { useState } from "react"
import { initializeBoard } from "../tools"
import Board from "./Board"


const Game = () => {
  const [squares] = useState(initializeBoard())
  const [selected, setSelected] = useState(-1)

  // Next TODO
  const handleSelect = (positionId) => {
    setSelected()
  }
  
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