import Pawn from '../components/pieces/Pawn'
import Rook from '../components/pieces/Rook'
import Knight from '../components/pieces/Knight'
import Bishop from '../components/pieces/Bishop'
import King from '../components/pieces/King'
import Queen from '../components/pieces/Queen'
import { isMovePossible } from '../movements'

export const renderPiece = (piece) => {
  if (piece.type === 'pawn')
    return piece.player === 'black' ?
      <Pawn player={'black'} />
      : <Pawn player={'white'} />

  else if (piece.type === 'rook')
    return piece.player === 'black' ?
      <Rook player={'black'} />
      : <Rook player={'white'} />

  else if (piece.type === 'knight')
    return piece.player === 'black' ?
      <Knight player={'black'} />
      : <Knight player={'white'} />

  else if (piece.type === 'bishop')
    return piece.player === 'black' ?
      <Bishop player={'black'} />
      : <Bishop player={'white'} />

  else if (piece.type === 'queen')
    return piece.player === 'black' ?
      <Queen player={'black'} />
      : <Queen player={'white'} />

  else if (piece.type === 'king')
    return piece.player === 'black' ?
      <King player={'black'} />
      : <King player={'white'} />
}

export const assignInitialPiece = (position, piece = false) => {
  if ((position >= 8 && position <= 15) || (position >= 48 && position <= 55)) {
    return 'pawn'
  }

  else if (position === 0 || position === 7 || position === 56 || position === 63) {
    return 'rook'
  }

  else if (position === 1 || position === 6 || position === 57 || position === 62) {
    return 'knight'
  }

  else if (position === 2 || position === 5 || position === 58 || position === 61) {
    return 'bishop'
  }

  else if (position === 4 || position === 60) {
    return 'king'
  }

  else if (position === 3 || position === 59) {
    return 'queen'
  }

  return null
}

const assignInitialPlayer = (position) => {
  if (position <= 15) return 'black'

  else if (position >= 48) return 'white'

  return null
}

const defineSquare = (position) => {
  const square = {
    id: position,
    piece: {
      player: assignInitialPlayer(position),
      type: assignInitialPiece(position)
    }
  }
  return square
}

export const initializeBoard = () => {
  let squares = []

  // TODO Replace this loop with reduce
  for (let i = 0; i <= 63; i++) {
    squares.push(defineSquare(i))
  }

  return squares
}

export const setPieceColor = (player, whitePiece, blackPiece) => (
  player === 'white' ? whitePiece : blackPiece
)

export const isEven = num => num % 2 === 0

export const processMove = (board, from, to) => {
  const newBoard = [...board]
  const piece = newBoard[from]?.piece
  
  // REMEMBER!!! returns a copy of the object with the specified values changed
  newBoard[from] = {
    ...newBoard[from],
    piece: {
      player: null,
      type: null
    }
  }

  newBoard[to] = {
    ...newBoard[to],
    piece
  }

  return newBoard
}

export const range = (size, startAt = 0) =>
[...Array(size).keys()].map(i => i + startAt);

export const getKingsPosition = (board) => 
board.filter(square => board[square.id].piece.type === 'king')

export const getPossibleMoves = (board, player) => {
  const opponent = player === 'white' ? 'black' : 'white'

  // filter player pieces position
  const playerPiecesPos = board.filter(piece =>
    piece.piece.player === player).map(piece => piece.id)
  // Evaluate possible moves of all of player pieces
  const enemyPiecesPos = board.filter(piece =>
    piece.piece.player === opponent).map(piece => piece.id)
    
  // TODO get rid of the for loop and only use reduce
  let playerPossibleMoves = []
  for (let to = 0; to < 64; to++) {
    playerPiecesPos.reduce((possibMoves, move) => {
      if (isMovePossible(board, move, to)) possibMoves.push({
        piece: board[move].piece.type,
        player: board[move].piece.player,
        from: move,
        to: to,
        canDestroy: null,
      })
      return possibMoves
    }, playerPossibleMoves)
  }

  playerPossibleMoves.filter(move => enemyPiecesPos.includes(move.to))
    .map(m => m.canDestroy = board[m.to].piece.type)

  return playerPossibleMoves
}
  // need to find the position of all the opponent pieces and check if any of them has the
// player's king on their path
export const isCheck = (board, player) => {
  const opponent = player === 'white' ? 'black' : 'white'
  const playerKingPosition = getKingsPosition(board)
    .filter(king => king.piece.player === player).map(king => king.id)
  const possibleMoves = getPossibleMoves(board, opponent)
  
  const canKillKing = () => {
    if (possibleMoves.includes(...playerKingPosition)) return true
    else return false
  }

  return canKillKing()
}

export const isPlayerTurn = (turn, player) => turn === player ? true : false

// TODO implement the logic for promotion

// if pawn reaches last row, prompt player to choose a piece for promotion
// if in the last row there is no piece on the forward diagonal sides
// it can only move straightforward if the square is empty

export const pawnPromotion = (board, lastMove, player) => {
  //const opponent = player === 'white' ? 'black' : 'white'
  let lastPieceMoved
  if (lastMove.length) {
    lastMove = lastMove.slice(-1)[0][1]
    lastPieceMoved = board[lastMove]?.piece.type
  }
  const promotionRow = {
    white: range(8, 0),
    black: range(8, 56)
  }
  const selectPromotionRow = player === 'white' ? promotionRow.white : promotionRow.black
  //console.log('promotionRow selected', selectPromotionRow);
  //console.log('includes last move?', selectPromotionRow.includes(lastMove));
  if (selectPromotionRow.includes(lastMove) && lastPieceMoved === 'pawn') return true

  return false
}