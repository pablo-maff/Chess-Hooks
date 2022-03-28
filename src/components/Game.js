import { useEffect, useState } from "react"
import { getKingsPosition, getPossibleMoves, initializeBoard, isCheck, isPlayerTurn, processMove } from "../tools"
import { isMovePossible } from "../movements"
import Board from "./Board"

const Game = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selected, setSelected] = useState([])
  const [turn, setTurn] = useState('white')
  const [checkMate, setCheckMate] = useState(false)

  if (checkMate) console.log('GAME OVER!');
  
  useEffect(() => {
    isCheck(board, turn)
  }, [board, turn])
  
  useEffect(() => {
    const from = selected[0]
    const to = selected[1]
    const kingPos = getKingsPosition(board)
    const canMove = isMovePossible(board, from, to)
    const isSelectedTurn = isPlayerTurn(turn, board[from]?.piece.player)

    if (kingPos.length < 2) {
      setCheckMate(true)
    }
    
    if (canMove && isSelectedTurn && !checkMate){
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