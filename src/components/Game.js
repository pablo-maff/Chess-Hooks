import { useEffect, useState } from 'react'
import { acceptPromotion,
  castlingAllowed,
  getKingsPosition,
  initializeBoard,
  isCheck,
  isEnPassant,
  isGoingToPromote,
  isPlayerTurn,
  processEnPassant,
  processMove,
  processPromotion,
  saveMovementHistory } from '../tools'
import { isMovePossible } from '../movements'
import Board from './Board'
import Promotion from './Promotion'
import Turn from './Turn'

// TODO: Move promotion to pawn movements and castling to king movements to simplify the logic here
// TODO: Implement notifications
// TODO: Implement visualization of moves history and map the square id's to real chess square names
// TODO: Fix moves history to work properly with en passant
// TODO: Work on the CSS
// TODO: Implement more tests
// TODO: Create a getPath function in movement helpers to not repeat code in every piece movement rules and to use it for checkmate notification
// TODO: Change for loops to use functions when possible
// TODO: Define @params for all functions
// TODO: Write more comments
// TODO: Make getPossibleMoves function SMARTER. See comments there for a possible solution.

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

  // eslint-disable-next-line no-console
  if (checkMate) console.log('GAME OVER!')

  const selectPromotedPiece = (e) => {
    setPromSelectedPiece(e.target.value)
  }

  useEffect(() => {
    const [from, to] = selected
    const kingPos = getKingsPosition(board)
    const selectedPlayer = board[from] ? board[from].piece.player : null
    const isSelectedTurn = isPlayerTurn(player, selectedPlayer)
    const pieceInSquare = board[from] ? board[from].piece.type : null
    const isEnPassantForPlayer = isEnPassant(board, pieceInSquare, player, from, to)
    const canMove = isMovePossible(board, from, to, movesHistory, player, pieceInSquare)
    const possibleBoard = processMove(board, from, to)
    const isCheckForPlayer = isCheck(board, player, movesHistory)
    const evalCheckOnNextMove = isCheck(possibleBoard, player, movesHistory)
    const canPromoteOnNextMove = isGoingToPromote(board, player, movesHistory)
    const canCastle = castlingAllowed(board, player, movesHistory, to, check)
    const [shortWhiteRook, longWhiteRook, shortBlackRook, longBlackRook] = [[63, 61], [56, 59], [7, 5], [0, 3]]


    // TODO If is checkmate without the need of destroying the king notify that the game is over
    if (kingPos.length < 2) {
      setCheckMate(true)
      // eslint-disable-next-line no-console
      return console.log('Game is Over')
    }

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
      setBoard(acceptPromotion(board, player, from, to))
      setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, player, pieceInSquare)))
      setPendingPromotion(false)
      setPromotion(true)
      setSelected([to])
    }

    else if (!canMove && to && !castling) {
      setSelected([])
      // eslint-disable-next-line no-console
      return console.log('That\'s not a valid move')
    }

    else if (isCheckForPlayer && !check) {
      setCheck(true)
    }
    else if (!pieceInSquare && from) {
      setSelected([])
      // eslint-disable-next-line no-console
      return console.log(('You can\'t play an empty square, please select a piece'))
    }

    else if (!isSelectedTurn && pieceInSquare) {
      setSelected([])
      // eslint-disable-next-line no-console
      return console.log('Those are not your pieces!')
    }

    else if (isEnPassantForPlayer) {
      player === 'white' ? setBoard(processEnPassant(board, to + 8))
        : setBoard(processEnPassant(board, to - 8))
    }

    else if (canMove && isSelectedTurn && !evalCheckOnNextMove && !checkMate){
      setBoard(processMove(board, from, to))
      if (check) setCheck(false)
      setMovesHistory(movesHistory.concat(saveMovementHistory(from, to, player, pieceInSquare)))
      setSelected([])
      setPlayer(player === 'white' ? 'black' : 'white')
    }

    else if (check && to) {
      setSelected([])
      // eslint-disable-next-line no-console
      return console.log('That\'s check, try a different move')
    }

    else if (evalCheckOnNextMove && to) {
      setSelected([])
      // eslint-disable-next-line no-console
      return console.log('That will cause check, try another move')
    }
  }, [board, selected, player, checkMate, check, promotion, pendingPromotion, promSelectedPiece, movesHistory, castling])

  // if contains a piece select square then select another square to move the piece
  const selectPiecePath = (boardId) => {
    setSelected(selected.concat(boardId))
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
      <Turn player={player} />
    </>
  )
}

export default Game