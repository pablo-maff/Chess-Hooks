import { useEffect, useState } from "react"
import { initializeBoard } from "../tools"
import Board from "./Board"

const processMove = (obj, from, to) => {
  const newPos = Object.assign(obj[to].piece, obj[from].piece)
  obj = Object.assign([...obj], newPos)
  //obj[from].piece.player = null
  //obj[from].piece.type.name = null
  //obj[from].piece.type.render = null

  return obj
}

const Game = () => {
  const [squares, setSquares] = useState([]) 
  const [selected, setSelected] = useState([])
  //console.log('selectedState',selected);


  useEffect(() => {
    setSquares(initializeBoard)
  }, [])

  // if contains a piece select square then select another square to move the piece, else null
  const movePiece = (squareId, from = selected[0], to = selected[1]) => {
    const moves = [...squares]
    if (selected.length < 2) setSelected(selected.concat(squareId))

    // if array is full, make move and clear state
    if (selected.length === 2) {
      setSquares(processMove(moves, from, to))
      console.log('from',moves[from].piece);
      console.log('to', moves[to].piece);
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