import Pawn from "../components/pieces/Pawn"
import Rook from "../components/pieces/Rook"
import Knight from "../components/pieces/Knight"
import Bishop from "../components/pieces/Bishop"
import King from "../components/pieces/King"
import Queen from "../components/pieces/Queen"

export const initializeBoard = () => {
  let squares = Array(64).fill(null)

  const range = (size, startAt) => {
    return [...Array(size).keys()].map(i => i + startAt)
  }

  const assignPosition = (position, piece) => (
    position.map(i => squares[i] = piece)
  )
  
  // There must be a way to not repeat all this function calls!
  assignPosition(range(8, 8), <Pawn player={2} />)
  assignPosition(range(8, 48), <Pawn player={1} />)
  assignPosition([0, 7], <Rook player={2} />)
  assignPosition([56, 63], <Rook player={1} />)
  assignPosition([1, 6], <Knight player={2} />)
  assignPosition([57, 62], <Knight player={1} />)
  assignPosition([2, 5], <Bishop player={2} />)
  assignPosition([58, 61], <Bishop player={1} />)
  assignPosition([4], <King player={2} />)
  assignPosition([60], <King player={1} />)
  assignPosition([3], <Queen player={2} />)
  assignPosition([59], <Queen player={1} />)


  return squares
}

export const renderPiece = (player, whitePiece, blackPiece) => (
  player === 1 ? whitePiece : blackPiece
)

