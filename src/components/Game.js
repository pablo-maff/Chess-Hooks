import { useEffect, useRef, useState } from "react"
import { acceptPromotion, castlingAllowed, enPassant, getKingsPosition, getPossibleMoves, initializeBoard, isCheck, isGoingToPromote, isPlayerTurn, processEnPassant, processMove, processPromotion, saveMovementHistory } from "../tools"
import { isMovePossible } from "../movements"
import Board from "./Board"
import Promotion from "./Promotion"

const Game = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selected, setSelected] = useState([])
  const [turn, setTurn] = useState('white')
  const [check, setCheck] = useState(false)
  const [checkMate, setCheckMate] = useState(false)
  const [movesHistory, setMovesHistory] = useState([])
  const [pendingPromotion, setPendingPromotion] = useState(false)
  const [promotion, setPromotion] = useState(false)
  const [promSelectedPiece, setPromSelectedPiece] = useState(false)
  const [castling, setCastling] = useState(false)
  const enPassantRef = useRef(false)
  console.log('enPassant', enPassant(board, turn, movesHistory))
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
    const canCastle = castlingAllowed(board, turn, movesHistory, to, check)
    const canMove = isMovePossible(board, from, to)
    const shortWhiteRook = [63, 61]
    const longWhiteRook = [56, 59]
    const shortBlackRook = [7, 5]
    const longBlackRook = [0, 3]
    const enPassantAllowed = enPassant(board, turn, movesHistory)

    //console.log('gameObj', movesHistory);
    // TODO If is checkmate without the need of destroying the king notify that the game is over
    console.log('enPassantRef', enPassantRef);
    if (kingPos.length < 2) {
      setCheckMate(true)
      return console.log('Game is Over');
    }

    else if (canPromoteOnNextMove.length && !pendingPromotion) {
      console.log('PENDING PROMOTION SET TO TRUE');
      setPendingPromotion(true)
    }
    
    else if (promotion && promSelectedPiece) {
      console.log('PROMOTION IS FUCKING YOU UP');
      const selectedPiece = {
        player: turn,
        type: promSelectedPiece
      }
      setBoard(processPromotion(board, from, selectedPiece))
      setSelected([])
      setPromotion(false)
      setTurn(turn === 'white' ? 'black' : 'white')
    }

    

    
    else if (canCastle && !castling) {
      setCastling(true)
      setBoard(processMove(board, from, to))
      if (turn) setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
      const [shortWhite, longWhite, shortBlack, longBlack] = [to === 62, to === 58, to === 6, to === 2]
      const rookToCastle = shortWhite ? shortWhiteRook : longWhite ? longWhiteRook : shortBlack ? shortBlackRook : longBlack ? longBlackRook : false
      console.log('rook',rookToCastle);
      setSelected(rookToCastle)
    }

    else if (castling) {
      setBoard(processMove(board, from, to))
      setCastling(false)
      setSelected([])
      setTurn(turn === 'white' ? 'black' : 'white')
    }

    else if (pendingPromotion && canPromoteOnNextMove.some(p => p.player === turn) &&
    canPromoteOnNextMove.some(p => p.to === to)) {
      console.log('PENDING PROMOTION IS FUCKING YOU UP')
      setBoard(acceptPromotion(board, turn, from, to))
      if (turn) setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
      setPendingPromotion(false)
      setPromotion(true)
      setSelected([to])
    }

    if ((enPassantAllowed.length && enPassantAllowed.includes(from) && board[to - 8]?.piece.type === 'pawn') 
        || (enPassantAllowed.length && enPassantAllowed?.includes(from) && board[to + 8]?.piece.type === 'pawn')) {
      console.log('EN PASSSANT ALLOWED!!!!');
      enPassantRef.current = true
      console.log('from', from, 'to', to);
      setBoard(processMove(board, from, to))
    }
    else if (!!enPassantRef.current && board[to - 8]?.piece.type === 'pawn') {
      setBoard(processEnPassant(board, to - 8))
      enPassantRef.current = false
      if (turn) setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
    setTurn(turn === 'white' ? 'black' : 'white')

    }
    else if (!!enPassantRef.current && board[to + 8]?.piece.type === 'pawn') {
      console.log('SECOND ENPASSANT ALLOWED!!!');
      setBoard(processMove(board, to + 8))
      enPassantRef.current = false
       if (turn) setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
     setTurn(turn === 'white' ? 'black' : 'white')

    }
  
    else if (!canMove && to && !castling && !enPassantAllowed.length && !enPassantRef) {
      console.log('NOT A VALID MOVE IS FUCKING YOU UP');
      setSelected([])
      return console.log('That\'s not a valid move'); 
    }
    
    else if (isCheckForPlayer && !check) {
      console.log('ISCHECK IS FUCKING YOU UP');
      setCheck(true)
    }
    else if (!pieceInSquare && from && !enPassantRef) {
      console.log('EMPTY SQUARE IS FUCKING YOU UP');
      setSelected([])
      return console.log(('You can\'t play an empty square, please select a piece'));
    }
    
    else if (!isSelectedTurn && pieceInSquare) {
      console.log('NOT YOUR PIECES IS FUCKING YOU UP');
      setSelected([])
      return console.log('Those are not your pieces!');
    }

    else if (canMove && isSelectedTurn && !evalCheckOnNextMove && !checkMate){
      console.log('MOVE IS FUCKING YOU UP');
      setBoard(processMove(board, from, to))
      if (check) setCheck(false)
      setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, turn, pieceInSquare)))
      setSelected([])
      setTurn(turn === 'white' ? 'black' : 'white')
    }
    
    else if (check && to) {
      console.log('TRY A DIFFERENT MOVE IS FUCKING YOU UP');      
      setSelected([])
      return console.log('That\'s check, try a different move');
    }
    
    else if (evalCheckOnNextMove && to) {
      console.log('THAT WILL CAUSE CHECK IS FUCKING YOU UP');
      setSelected([])
      return console.log('That will cause check, try another move')
    }
  }, [board, selected, turn, checkMate, check, promotion, pendingPromotion, promSelectedPiece, movesHistory, castling])

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