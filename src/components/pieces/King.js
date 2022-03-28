import { setPieceColor } from "../../tools"

const King = ({ player }) => {
  const whiteKing = '♔'
  const blackKing = '♚'

  return setPieceColor(player, whiteKing, blackKing)
}

export default King