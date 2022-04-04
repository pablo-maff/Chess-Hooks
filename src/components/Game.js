import { useEffect, useRef, useState } from "react"
import { acceptPromotion, castlingAllowed, enPassant, getKingsPosition, getPossibleMoves, initializeBoard, isCheck, isGoingToPromote, isPlayerTurn, processEnPassant, processMove, processPromotion, saveMovementHistory } from "../tools"
import { isMovePossible } from "../movements"
import Board from "./Board"
import Promotion from "./Promotion"

const Game = () => {
  const [board, setBoard] = useState(initializeBoard())
  const [selected, setSelected] = useState([])
  const [player, setPlayer] = useState('white')
  const [check, setCheck] = useState(false)
  const [checkMate, setCheckMate] = useState(false)
  const [movesHistory, setMovesHistory] = useState([])
  const [pendingPromotion, setPendingPromotion] = useState(false)
  const [promotion, setPromotion] = useState(false)
  const [promSelectedPiece, setPromSelectedPiece] = useState(false)
  const [castling, setCastling] = useState(false)
  const [enPassantState, setEnPassantState] = useState(false)

  if (checkMate) console.log('GAME OVER!');

  console.log('player', player);

  const selectPromotedPiece = (e) => {
    setPromSelectedPiece(e.target.value) 
  }
  
  useEffect(() => {
    const [from, to] = selected
    const kingPos = getKingsPosition(board)
    const isSelectedTurn = isPlayerTurn(player, board[from]?.piece.player)
    const pieceInSquare = board[from]?.piece.type
    const isCheckForPlayer = isCheck(board, player) 
    const canMove = isMovePossible(board, from, to, movesHistory, player, pieceInSquare)
    const possibleBoard = processMove(board, from, to)
    const evalCheckOnNextMove = isCheck(possibleBoard, player)
    //const playerPossibleMoves = getPossibleMoves(board, player)
    const canPromoteOnNextMove = isGoingToPromote(board, player)
    const canCastle = castlingAllowed(board, player, movesHistory, to, check)
    const shortWhiteRook = [63, 61]
    const longWhiteRook = [56, 59]
    const shortBlackRook = [7, 5]
    const longBlackRook = [0, 3]
    const enPassantAllowed = enPassant(board, player, movesHistory)

    console.log('from', from, 'to', to);

    // TODO If is checkmate without the need of destroying the king notify that the game is over
    if (kingPos.length < 2) {
      setCheckMate(true)
      return console.log('Game is Over');
    }
    console.log('enPassantAllowed',enPassantAllowed);
    console.log('enPassantState', enPassantState);
    if (enPassantAllowed.length && from === enPassantAllowed[0] && to === enPassantAllowed[1]){
      setEnPassantState(true)
    }



    // Will need changes in case of two pawns in position of executing en passant
    // if (enPassantAllowed.length && from === enPassantAllowed[0] && to === enPassantAllowed[1]){
    //   //enPassantRef.current = true
    //   setBoard(processMove(board, from, to))
    //   setBoard(processEnPassant(board, to - 8))

    // }

    // else if (!!enPassantRef.current && board[to - 8]?.piece.type === 'pawn') {
    //   setBoard(processEnPassant(board, to - 8))
    //   setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, player, pieceInSquare)))
    //   setPlayer(player === 'white' ? 'black' : 'white')
    //   setSelected([])
    //   enPassantRef.current = false

    // }
    // else if (!!enPassantRef.current && board[to + 8]?.piece.type === 'pawn') {
    //   setBoard(processMove(board, to + 8))
    //   setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, player, pieceInSquare)))
    //   setPlayer(player === 'white' ? 'black' : 'white')
    //   setSelected([])
    //   enPassantRef.current = false

    // }
    if (canPromoteOnNextMove.length && !pendingPromotion) {
      setPendingPromotion(true)
    }
    
    if (promotion && promSelectedPiece) {
      const selectedPiece = {
        player: player,
        type: promSelectedPiece
      }
      setBoard(processPromotion(board, from, selectedPiece))
      setSelected([])
      setPromotion(false)
      setPlayer(player === 'white' ? 'black' : 'white')
    }

    if (canCastle && !castling) {
      setCastling(true)
      setBoard(processMove(board, from, to))
      setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, player, pieceInSquare)))
      const [shortWhite, longWhite, shortBlack, longBlack] = [to === 62, to === 58, to === 6, to === 2]
      const rookToCastle = shortWhite ? shortWhiteRook : longWhite ? longWhiteRook : shortBlack ? shortBlackRook : longBlack ? longBlackRook : false
      setSelected(rookToCastle)
    }

    else if (castling) {
      setBoard(processMove(board, from, to))
      setCastling(false)
      setSelected([])
      setPlayer(player === 'white' ? 'black' : 'white')
    }

    else if (pendingPromotion && canPromoteOnNextMove.some(p => p.player === player) &&
    canPromoteOnNextMove.some(p => p.to === to)) {
      console.log('PENDING PROMOTION IS FUCKING YOU UP')
      setBoard(acceptPromotion(board, player, from, to))
      setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, player, pieceInSquare)))
      setPendingPromotion(false)
      setPromotion(true)
      setSelected([to])
    }

  
    else if (!canMove && to && !castling) {
      console.log('NOT A VALID MOVE IS FUCKING YOU UP');
      setSelected([])
      return console.log('That\'s not a valid move'); 
    }
    
    else if (isCheckForPlayer && !check) {
      console.log('ISCHECK IS FUCKING YOU UP');
      setCheck(true)
    }
    else if (!pieceInSquare && from) {
      console.log('EMPTY SQUARE IS FUCKING YOU UP');
      setSelected([])
      return console.log(('You can\'t play an empty square, please select a piece'));
    }
    
    else if (!isSelectedTurn && pieceInSquare) {
      console.log('NOT YOUR PIECES IS FUCKING YOU UP');
      setSelected([])
      return console.log('Those are not your pieces!');
    }

    else if (canMove && isSelectedTurn && !checkMate){
      console.log('MOVE IS FUCKING YOU UP');
      if (enPassantState) {
        setBoard(processEnPassant(board, to - 8))
        setEnPassantState(false)
      }
      setBoard(processMove(board, from, to))
      if (check) setCheck(false)
      setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, player, pieceInSquare)))
      setSelected([])
      setPlayer(player === 'white' ? 'black' : 'white')
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
  }, [board, selected, player, checkMate, check, promotion, pendingPromotion, promSelectedPiece, movesHistory, castling])

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
      {promotion && <Promotion player={player} selectPiece={selectPromotedPiece} />}
    </>
  )
}

export default Game