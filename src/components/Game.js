import { useState } from "react"
import { initializeBoard } from "../tools"
import Board from "./Board"


const Game = () => {
  const [squares] = useState(initializeBoard())
  const [selected, setSelected] = useState(null)
  console.log('selectedState',selected);
  
  // if contains a piece select square then select another square to move the piece, else null
  const handleSelect = (squareId) => {
    setSelected(squareId)
  }
  
  return (
     <div className="game-board">
       <Board 
         squares={squares}
         selectSquare={handleSelect}
       />
     </div>
  )
}

export default Game