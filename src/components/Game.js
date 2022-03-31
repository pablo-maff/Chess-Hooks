import { useEffect, useState } from "react"
import { acceptPromotion, getKingsPosition, initializeBoard, isCheck, isGoingToPromote, isPlayerTurn, processMove, processPromotion } from "../tools"
import { isMovePossible } from "../movements"
import Board from "./Board"
import Promotion from "./Promotion"

// TODO en passant and castling
const Game = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selected, setSelected] = useState([])
  const [turn, setTurn] = useState('white')
  const [check, setCheck] = useState(false)
  const [checkMate, setCheckMate] = useState(false)
  const [whiteMoves, setWhiteMoves] = useState([])
  const [blackMoves, setBlackMoves] = useState([])
  const [pendingPromotion, setPendingPromotion] = useState(false)
  const [promotion, setPromotion] = useState(false)
  const [promSelectedPiece, setPromSelectedPiece] = useState(false)

  if (checkMate) console.log('GAME OVER!');

  const selectPromotedPiece = (e) => {
    setPromSelectedPiece(e.target.value) 
  }
  
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
    const canPromoteOnNextMove = isGoingToPromote(board, turn)

    // TODO If is checkmate without the need of destroying the king notify that the game is over
    if (kingPos.length < 2) {
      setCheckMate(true)
      return console.log('Game is Over');
    }
    
    if (canPromoteOnNextMove.length && !pendingPromotion) {
      setPendingPromotion(true)
    }

    if (promotion && promSelectedPiece) {
      const selectedPiece = {
        player: turn,
        type: promSelectedPiece
      }
      setBoard(processPromotion(board, from, selectedPiece))
      setSelected([])
      setPromotion(false)
      setTurn(turn === 'white' ? 'black' : 'white')
    }

    else if (pendingPromotion && canPromoteOnNextMove.some(p => p.player === turn) &&
    canPromoteOnNextMove.some(p => p.to === to)) {
      setBoard(acceptPromotion(board, turn, from, to))
      setPendingPromotion(false)
      setPromotion(true)
      setSelected([to])
    }
  
    else if (!canMove && to) {
      setSelected([])
      return console.log('That\'s not a valid move'); 
    }
    
    else if (isCheckForPlayer && !check) {
      setCheck(true)
    }
    else if (!pieceInSquare && from) {
      setSelected([])
      return console.log(('You can\'t play an empty square, please select a piece'));
    }
    
    else if (!isSelectedTurn && pieceInSquare) {
      setSelected([])
      return console.log('Those are not your pieces!');
    }
    else if (canMove && isSelectedTurn && !evalCheckOnNextMove && !checkMate){
      //console.log('MOVE IS FUCKING YOU UP');
      setBoard(processMove(board, from, to))
      if (check) setCheck(false)
      if (turn === 'white') setWhiteMoves(whiteMoves.concat([[from, to]]))
      if (turn === 'black') setBlackMoves(blackMoves.concat([[from, to]]))
      setSelected([])
      setTurn(turn === 'white' ? 'black' : 'white')
    }
    
    else if (check && to) {
      setSelected([])
      return console.log('That\'s check, try a different move');
    }
    
    else if (evalCheckOnNextMove && to) {
      setSelected([])
      return console.log('That will cause check, try another move')
    }
  }, [board, selected, turn, checkMate, check, whiteMoves, blackMoves, promotion, pendingPromotion, promSelectedPiece])

  // if contains a piece select square then select another square to move the piece
  const selectPiecePath = (boardId) => {
    // select to
    if (selected.length < 2 && !promotion) {
      setSelected(selected.concat(boardId))
    }
    // select from
    else if (board[boardId].piece.type !== null && !promotion) {
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
      {promotion && <Promotion player={turn} selectPiece={selectPromotedPiece} />}
    </>
  )
}

export default Game