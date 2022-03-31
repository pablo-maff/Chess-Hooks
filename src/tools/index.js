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

  // Get player pieces position
  const playerPiecesPos = board.filter(piece =>
    piece.piece.player === player).map(piece => piece.id)
  // Get enemy pieces position
  const enemyPiecesPos = board.filter(piece =>
    piece.piece.player === opponent).map(piece => piece.id)
      
  // TODO get rid of the for loop and only use reduce
  // Evaluate possible moves of all of player pieces
  let playerPossibleMoves = []
  for (let to = 0; to < 64; to++) {
    playerPiecesPos.reduce((possibMoves, move) => {
      if (isMovePossible(board, move, to)) possibMoves.push({
        type: board[move].piece.type,
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

export const isCheck = (board, player) => {
  const opponent = player === 'white' ? 'black' : 'white'
  const canDestroyKing = getPossibleMoves(board, opponent).filter(piece => piece.canDestroy === 'king')
  if (canDestroyKing.length) return true
  else return false
}

export const isPlayerTurn = (turn, player) => turn === player ? true : false

export const isGoingToPromote = (board, player) => {
  const promotionRow = {
    white: range(8, 0),
    black: range(8, 56)
  }
  const selectPromotionRow = player === 'white' ? promotionRow.white : promotionRow.black
  const isGoingToPromote = getPossibleMoves(board, player).filter(pos =>
    selectPromotionRow.includes(pos.to) && pos.type === 'pawn').map(promSquares => (
      {
        player: promSquares.player,
        from: promSquares.from,
        to: promSquares.to
      }))

  return isGoingToPromote
}

export const acceptPromotion = (board, player, from, to) => {
  const possiblePromPos = isGoingToPromote(board, player)
  if (possiblePromPos.some(move => move.from === from && move.to === to)) {
    return processMove(board, from, to)
  }
}

export const processPromotion = (board, from, piece) => {
  const newBoard = [...board]
  newBoard[from] = {
    ...newBoard[from],
    piece
  }
  return newBoard
}

let [whiteNum, blackNum] = [1, 1]
export const saveMovementHistory = (from, to, player, piece) => {
  const moveObj = {
    moveNum: null,
    piece,
    from,
    to
  }
  
  if (player === 'white') {
    let whiteMoveObj = {...moveObj}
    whiteMoveObj.moveNum = whiteNum
    whiteNum++
    return whiteMoveObj
  }
  else {
    let blackMoveObj = {...moveObj}
    blackMoveObj.moveNum = blackNum
    blackNum++
    return blackMoveObj
  }
}

export const castlingAllowed = (board, player, movesHistory, to, check) => {
  // - Neither king or rook has moved
  //    Get movement history and check if they have not moved
  // - There must not be any pieces between the king and the rook
  //    Check path squares
  // - The king may not be in check
  //    Perform check checking
  // - The square the king goes and its path may not be under atack
  //    Perform atack checking on this squares
  // - If rook is under attack castling is allowed
  const opponent = player === 'white' ? 'black' : 'white'
  const movesHistoryFrom = movesHistory.from
  const opponentPossibleMoves = getPossibleMoves(board, opponent)
  const shortWhiteKing = 62
  const longWhiteKing = 58
  const shortBlackKing = 6
  const longBlackKing = 2
  const longWhiteRook = 56
  const shortWhiteRook = 63
  const longBlackRook = 0
  const shortBlackRook = 7

  const shortWhiteCastlingPath = [61, 62]

  const checkPath = (board, path) => {
    for (let square of path) {
      if (board[square].piece.type) return false
    }
    return true
  }

  console.log('movesHistory', typeof movesHistory);

  if (movesHistory.find(piece => piece === 'king')) return false

  else if (shortWhiteKing === to && !movesHistory.find(move => move.from === shortWhiteRook)
    && checkPath(board, shortWhiteCastlingPath) && !check
    && !opponentPossibleMoves.find(move => move.to === (61 || 62))) {
      return true
  }
  return false
}

export const processCastle = (board, from, to, piece) => {
  let newBoard = processMove(board, from, to)
  //processMove(board, 63, 61)
  return newBoard
}