import Pawn from '../components/pieces/Pawn'
import Rook from '../components/pieces/Rook'
import Knight from '../components/pieces/Knight'
import Bishop from '../components/pieces/Bishop'
import King from '../components/pieces/King'
import Queen from '../components/pieces/Queen'

const assignInitialPiece = (position, piece = false) => {  
  if (position >= 8 && position <= 15) {
    if (piece) return <Pawn player={'black'}/>
    else return 'pawn'
  }
  else if (position >= 48 && position <= 55) {
    if (piece) return <Pawn player={'white'}/>
    else return 'pawn'
  }

  if (position === 0 || position === 7) {
    if (piece) return <Rook player={'black'}/>
    else return 'rook'
  }
  else if (position === 56 || position === 63){
    if (piece) return <Rook player={'white'}/>
    else return 'rook'
  }

  if (position === 1 || position === 6) {
    if (piece) return <Knight player={'black'}/>
    else return 'knight'
  }
  else if (position === 57 || position === 62) {
    if (piece) return <Knight player={'white'}/>
    else return 'knight'
  }

  if (position === 2 || position === 5 ) {
    if (piece) return <Bishop player={'black'}/>
    else return 'bishop'
  }
  else if (position === 58 || position === 61) {
    if (piece) return <Bishop player={'white'}/>
    else return 'bishop'
  }

  if (position === 4) {
    if (piece) return <King player={'black'}/>
    else return 'king'
  } 
  else if (position === 60) {
    if (piece) return <King player={'white'}/>
    else return 'king'
  }

  if (position === 3){
    if (piece) return <Queen player={'black'}/>
    return 'queen'
  } 
  else if (position === 59) {
    if (piece) return <Queen player={'white'}/>
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
    onClick: null, // if contains a piece select it, else null
    piece: {
      player: assignInitialPlayer(position),
      type: {
        name: assignInitialPiece(position),
        render: assignInitialPiece(position, true)
      }
    }
  }
  return square
}

export const initializeBoard = () => {
  let squares = []

  for (let i = 0; i <= 63; i++) {
    squares.push(defineSquare(i))
  }
  
  return squares
}

 export const renderPiece = (player, whitePiece, blackPiece) => (
   player === 'white' ? whitePiece : blackPiece
 )

export const isEven = num => num % 2 === 0

