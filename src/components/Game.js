import { useEffect, useState } from "react"
import { getKingsPosition, getPossibleMoves, initializeBoard, isCheck, isPlayerTurn, pawnPromotion, processMove } from "../tools"
import { isMovePossible } from "../movements"
import Board from "./Board"
import Promotion from "./Promotion"

const Game = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selected, setSelected] = useState([])
  const [turn, setTurn] = useState('white')
  const [check, setCheck] = useState(false)
  const [checkMate, setCheckMate] = useState(false)
  const [whiteMoves, setWhiteMoves] = useState([])
  const [blackMoves, setBlackMoves] = useState([])
  const [promotion, setPromotion] = useState(false)


  if (checkMate) console.log('GAME OVER!');
  
  
  useEffect(() => {
    const from = selected[0]
    const to = selected[1]
    const kingPos = getKingsPosition(board)
    const canMove = isMovePossible(board, from, to)
    const isSelectedTurn = isPlayerTurn(turn, board[from]?.piece.player)
    const pieceInSquare = board[from]?.piece.type
    const isCheckForPlayer = isCheck(board, turn) 
    const possibleBoard = processMove(board, from, to)
    const evalCheckOnNextMove = isCheck(possibleBoard, turn)
    
    
    // TODO If is checkmate without the need of destroying the king notify that the game is over
    
    if (kingPos.length < 2) {
      setCheckMate(true)
      return console.log('Game is Over');
    }

    // Promotion is displayed for white pieces
    // NEXT TODO display it for black pieces as well and implement the logic for swapping pieces
    // Player in promotion should keep control and no other pieces can be moved until promotion is completed
    console.log('promotion', promotion);
    if (pawnPromotion(board,whiteMoves, turn)) setPromotion(true)

    if (!canMove && to) {
      setSelected([])
      return console.log('That\'s not a valid move'); 
    }
    
    if (isCheckForPlayer) setCheck(true)
    
    if (!pieceInSquare && from) {
      setSelected([])
      return console.log(('You can\'t play an empty square, please select a piece'));
    }
    
    if (!isSelectedTurn && pieceInSquare) {
      setSelected([])
      return console.log('Those are not your pieces!');
    }
    
    else if (canMove && isSelectedTurn && !evalCheckOnNextMove && !checkMate){
      if (check) setCheck(false)
      if (turn === 'white') setWhiteMoves(whiteMoves.concat([[from, to]]))
      if (turn === 'black') setBlackMoves(blackMoves.concat([[from, to]]))
      setBoard(processMove(board, from, to))
      setSelected([])
      setTurn(turn === 'white' ? 'black' : 'white')
    }
    
    else if (check && to) {
      setSelected([])
      console.log('That\'s check, try a different move');
    }
    
    else if (evalCheckOnNextMove && to) {
      setSelected([])
      return console.log('That will cause check, try another move')
    }

  }, [board, selected, turn, checkMate, check, whiteMoves, blackMoves])

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
    <>
      <div className="game-board">
        <Board
          board={board}
          selectSquare={selectPiecePath}
        />
      </div>
      {promotion && <Promotion player={turn}/>}
    </>
  )
}

export default Game