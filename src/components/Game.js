import { useEffect, useState } from "react"
import { getKingPosition, initializeBoard, processMove } from "../tools"
import { isMovePossible } from "../movements"
import Board from "./Board"

const Game = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selected, setSelected] = useState([])
  const [checkMate, setCheckMate] = useState(false)
  const [turn, setTurn] = useState('white')
  
  if (checkMate) console.log('GAME OVER!');

  useEffect(() => {
    console.log('EFFECT!');
    const from = selected[0]
    const to = selected[1]
    const kingPos = getKingPosition(board)
    const canMove = isMovePossible(board, from, to, turn, checkMate)

    if (kingPos.length < 2) {
      setCheckMate(true)
    }

    if (canMove){
      setBoard(processMove(board, from, to))
      setSelected([])
      setTurn(turn === 'white' ? 'black' : 'white')
    }
    else if (selected.length === 2) setSelected([])

  }, [board, selected, turn, checkMate])

  // if contains a piece select square then select another square to move the piece
  const selectPiecePath = (boardId) => {
    // select to
    if (selected.length < 2) {
      setSelected(selected.concat(boardId))
    }
    // select from
    else if (board[boardId].piece.type !== null) {
      setSelected(selected.concat(boardId))
    }
    
  }

  // const isCheckMate = () => {
  //   getKingPosition(board)

  //   if (getKingPosition.length === 1) {
  //     setCheckMate(true)
  //   }
  // }

  //if (checkMate) return console.log('GAME OVER!');

  return (
    <div className="game-board">
      <Board
        board={board}
        selectSquare={selectPiecePath}
      />
    </div>
  )
}

export default Game