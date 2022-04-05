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

  if (piece.type === 'rook')
    return piece.player === 'black' ?
      <Rook player={'black'} />
      : <Rook player={'white'} />

  if (piece.type === 'knight')
    return piece.player === 'black' ?
      <Knight player={'black'} />
      : <Knight player={'white'} />

  if (piece.type === 'bishop')
    return piece.player === 'black' ?
      <Bishop player={'black'} />
      : <Bishop player={'white'} />

  if (piece.type === 'queen')
    return piece.player === 'black' ?
      <Queen player={'black'} />
      : <Queen player={'white'} />

  if (piece.type === 'king')
    return piece.player === 'black' ?
      <King player={'black'} />
      : <King player={'white'} />
}

export const assignInitialPiece = (position) => {
  if ((position >= 8 && position <= 15) || (position >= 48 && position <= 55)) {
    return 'pawn'
  }

  if (position === 0 || position === 7 || position === 56 || position === 63) {
    return 'rook'
  }

  if (position === 1 || position === 6 || position === 57 || position === 62) {
    return 'knight'
  }

  if (position === 2 || position === 5 || position === 58 || position === 61) {
    return 'bishop'
  }

  if (position === 4 || position === 60) {
    return 'king'
  }

  if (position === 3 || position === 59) {
    return 'queen'
  }

  return null
}

const assignInitialPlayer = (position) => {
  if (position <= 15) return 'black'

  if (position >= 48) return 'white'

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

export const getPossibleMoves = (board, player, movesHistory) => {
  const opponent = player === 'white' ? 'black' : 'white'

  const playerPiecesPos = board.filter(piece =>
    piece.piece.player === player).map(piece => piece.id)

  const enemyPiecesPos = board.filter(piece =>
    piece.piece.player === opponent).map(piece => piece.id)

  // TODO get rid of the for loop and only use reduce
  let playerPossibleMoves = []
  for (let to = 0; to < 64; to++) {
    playerPiecesPos.reduce((possibMoves, move) => {
      if (isMovePossible(board, move, to, movesHistory, player, board[move]?.piece.type)) possibMoves.push({
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

export const isCheck = (board, player, movesHistory) => {
  const opponent = player === 'white' ? 'black' : 'white'
  const canDestroyKing = getPossibleMoves(board, opponent, movesHistory).filter(piece => piece.canDestroy === 'king')
  if (canDestroyKing.length) return true
  else return false
}

export const isPlayerTurn = (turn, player) => turn === player ? true : false

export const isGoingToPromote = (board, player, movesHistory) => {
  const promotionRow = {
    white: range(8, 0),
    black: range(8, 56)
  }
  const selectPromotionRow = player === 'white' ? promotionRow.white : promotionRow.black

  const isGoingToPromote = getPossibleMoves(board, player, movesHistory).filter(pos =>
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

let moveNum = 1
export const saveMovementHistory = (from, to, player, piece) => {
  let moveObj = { moveNumber: moveNum }
  if (player === 'white') {
    moveObj = { ...moveObj, white: { piece, player, from, to } }
  }

  if (player === 'black') {
    moveObj = { ...moveObj, black: { piece, player, from, to } }
    moveNum++
  }
  return moveObj
}

export const castlingAllowed = (board, player, movesHistory, to, check) => {
  const opponent = player === 'white' ? 'black' : 'white'
  const opponentPossibleMoves = getPossibleMoves(board, opponent, movesHistory)
  const [shortWhiteKing, longWhiteKing, shortBlackKing, longBlackKing, longWhiteRook,
    shortWhiteRook, longBlackRook, shortBlackRook] = [62, 58, 6, 2, 56, 63, 0, 7]
    
  const [shortWhiteCastlingPath, longWhiteCastlingPath, shortBlackCastlingPath,
    longBlackCastlingPath] = [[61, 62], [57, 58, 59], [5, 6], [1, 2, 3]]

  const selectKing = shortWhiteKing === to ? shortWhiteKing : longWhiteKing === to ? longWhiteKing
  : shortBlackKing === to ? shortBlackKing : longBlackKing === to ? longBlackKing : null

  const selectRook = shortWhiteKing === to ? shortWhiteRook : longWhiteKing === to ? longWhiteRook
  : shortBlackKing === to ? shortBlackRook : longBlackKing === to ? longBlackRook : null

  const selectTo = shortWhiteKing === to ? 62 : longWhiteKing === to ? 58
  : shortBlackKing === to ? 6 : longBlackKing === to ? 2 : null

  const selectedPath = shortWhiteKing === to ? shortWhiteCastlingPath : longWhiteKing === to ? longWhiteCastlingPath
  : shortBlackKing === to ? shortBlackCastlingPath : longBlackKing === to ? longBlackCastlingPath : null
    
  // - There must not be any pieces between the king and the rook
  //    Check path squares
  const checkPath = (board, path) => {
    for (let square of path) {
      if (board[square].piece.type) return false
    }
    return true
  }

  // - Neither king or rook has moved
  //    Get movement history and check if they have not moved
  if (movesHistory.find(move => move.piece === 'king' && move.player === player)) return false

  // - The king may not be in check
  //    Perform check checking
  // - The square the king goes and its path may not be under atack
  //    Perform atack checking on this squares
  // - If rook is under attack castling is allowed
  if (selectKing && !movesHistory.find(move => move.from === selectRook)
    && checkPath(board, selectedPath) && !check
    && !opponentPossibleMoves.find(move => move.to === selectTo)) {
    return true
  }

  return false
}

export const enPassant = (board, player, movesHistory) => {
  const opponent = player === 'white' ? 'black' : 'white'

  // - The capturing pawn must have advanced exactly three ranks to perform this move.
  //      If white pawn is in range 24 to 31 or black pawn is in range 32 to 39
  const enPassantPositions = {
    white: range(8, 24),
    black: range(8, 32)
  }

  const pawnInPos = board?.filter((square) => enPassantPositions[player].includes(square.id)
    && square.piece.type === 'pawn' && square.piece.player === player)
    .map(pawn => pawn.id)

  // - The en passant capture must be performed on the turn immediately after the pawn being captured moves. If the player does not capture en passant on that turn, they no longer can do it later.
  const enemyPawnLastMove = movesHistory?.slice(-1)

  // - The captured pawn must have advanced two squares in one move, landing right next to the capturing pawn.
  //      If white, opponent last move is pawn and from + to = 16. If black, opponent last move is pawn and from - to = 16.
  //      And player pawn pos - 1 or pos + 1 = opponent pawn

  const lastMoveAllowsEnPassant = enemyPawnLastMove?.filter(move =>
    Math.abs(move[opponent]?.to - move[opponent]?.from) === 16).map(pawn => pawn[opponent].to)

  const validEnPassant = pawnInPos?.filter(pawn => pawn - 1 === lastMoveAllowsEnPassant[0] || pawn + 1 === lastMoveAllowsEnPassant[0] || false)

  const selectTo = player === 'white' ? lastMoveAllowsEnPassant - 8 : lastMoveAllowsEnPassant ^ 8

  // Return the valid move as an array
  if (validEnPassant.length) {
    const validMove = validEnPassant.concat(selectTo)
    return validMove
  }

  return false
}

export const processEnPassant = (board, from) => {
  const newBoard = [...board]
  newBoard[from] = {
    ...newBoard[from],
    piece: {
      player: null,
      type: null
    }
  }
  return newBoard
}

export const getOpponent = player => player === 'white' ? 'black' : 'white'

export const isEnPassant = (board, piece, player, from, to) => {
  const dest = board[to]?.piece.type === null
  const validMove = Math.abs(from - to)
  const blackEnemyPawnDestroyed = board[to + 8]?.piece.type === null
  const whiteEnemyPawnDestroyed = board[to - 8]?.piece.type === null

  // Need to return false to prevent infite loop after executing the first move of 
  // en passant which is destroying the enemy pawn. Now we can execute the second 
  // part which is moving the player's pawn to its corresponding position
  if (player === 'white' && blackEnemyPawnDestroyed) return false

  if (player === 'black' && whiteEnemyPawnDestroyed) return false

  if (piece === 'pawn' && dest && (validMove === 9 || validMove === 7)) {
    return true
  }
  return false
}