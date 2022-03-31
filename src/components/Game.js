import { useEffect, useState } from "react"
import { acceptPromotion, castlingAllowed, getKingsPosition, getPossibleMoves, initializeBoard, isCheck, isGoingToPromote, isPlayerTurn, processCastle, processMove, processPromotion, saveMovementHistory } from "../tools"
import { isMovePossible } from "../movements"
import Board from "./Board"
import Promotion from "./Promotion"

const Game = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selected, setSelected] = useState([])
  const [turn, setTurn] = useState('white')
  const [check, setCheck] = useState(false)
  const [checkMate, setCheckMate] = useState(false)
  const [whiteMovesHistory, setWhiteMovesHistory] = useState([])
  const [blackMovesHistory, setBlackMovesHistory] = useState([])
  const [pendingPromotion, setPendingPromotion] = useState(false)
  const [promotion, setPromotion] = useState(false)
  const [promSelectedPiece, setPromSelectedPiece] = useState(false)
  const [castling, setCastling] = useState(false)

  if (checkMate) console.log('GAME OVER!');

  const selectPromotedPiece = (e) => {
    setPromSelectedPiece(e.target.value) 
  }
  
  useEffect(() => {
    const [from, to] = selected
    const kingPos = getKingsPosition(board)
    const isSelectedTurn = isPlayerTurn(turn, board[from]?.piece.player)
    const pieceInSquare = board[from]?.piece.type
    const isCheckForPlayer = isCheck(board, turn) 
    const possibleBoard = processMove(board, from, to)
    const evalCheckOnNextMove = isCheck(possibleBoard, turn)
    //const playerPossibleMoves = getPossibleMoves(board, turn)
    const canPromoteOnNextMove = isGoingToPromote(board, turn)
    const canCastle = castlingAllowed(board, turn, whiteMovesHistory, to, check)
    const canMove = isMovePossible(board, from, to, turn, whiteMovesHistory, check)

    console.log('canCastle', canCastle);

    // TODO If is checkmate without the need of destroying the king notify that the game is over
    if (kingPos.length < 2) {
      setCheckMate(true)
      return console.log('Game is Over');
    }

    if (canCastle && !castling) {
      setCastling(true)
      console.log('CASTLE!');
      setBoard(processCastle(board, from, to))
      setSelected([63, 61])
      
      //setBoard(processMove(board, 63, 61))
    }

    if (castling) {
      setBoard(processMove(board, 63, 61))
      setCastling(false)
      setSelected([])
    }
    
    if (canPromoteOnNextMove.length && !pendingPromotion) {
      //console.log('PENDING PROMOTION SET TO TRUE');
      setPendingPromotion(true)
    }
    
    if (promotion && promSelectedPiece) {
      //console.log('PROMOTION IS FUCKING YOU UP');
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
      //console.log('PENDING PROMOTION IS FUCKING YOU UP')
      setBoard(acceptPromotion(board, turn, from, to))
      if (turn === 'white') setWhiteMovesHistory(whiteMovesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
      if (turn === 'black') setBlackMovesHistory(blackMovesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
      setPendingPromotion(false)
      setPromotion(true)
      setSelected([to])
    }
  
    else if (!canMove && to) {
      //console.log('NOT A VALID MOVE IS FUCKING YOU UP');
      setSelected([])
      return console.log('That\'s not a valid move'); 
    }
    
    else if (isCheckForPlayer && !check) {
      //console.log('ISCHECK IS FUCKING YOU UP');
      setCheck(true)
    }
    else if (!pieceInSquare && from) {
      //console.log('EMPTY SQUARE IS FUCKING YOU UP');
      setSelected([])
      return console.log(('You can\'t play an empty square, please select a piece'));
    }
    
    else if (!isSelectedTurn && pieceInSquare) {
      //console.log('NOT YOUR PIECES IS FUCKING YOU UP');
      setSelected([])
      return console.log('Those are not your pieces!');
    }

    else if (canMove && isSelectedTurn && !evalCheckOnNextMove && !checkMate){
      console.log('MOVE IS FUCKING YOU UP');
      setBoard(processMove(board, from, to))
      if (check) setCheck(false)
      if (turn === 'white') setWhiteMovesHistory(whiteMovesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
      if (turn === 'black') setBlackMovesHistory(blackMovesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
      setSelected([])
      setTurn(turn === 'white' ? 'black' : 'white')
    }
    
    else if (check && to) {
      //console.log('TRY A DIFFERENT MOVE IS FUCKING YOU UP');      
      setSelected([])
      return console.log('That\'s check, try a different move');
    }
    
    else if (evalCheckOnNextMove && to) {
      //console.log('THAT WILL CAUSE CHECK IS FUCKING YOU UP');
      setSelected([])
      return console.log('That will cause check, try another move')
    }
  }, [board, selected, turn, checkMate, check, promotion, pendingPromotion, promSelectedPiece, whiteMovesHistory, blackMovesHistory])

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