import { setPieceColour } from "../../tools"

const King = ({ player }) => {
  const whiteKing = '♔'
  const blackKing = '♚'

  return setPieceColour(player, whiteKing, blackKing)
}

export default King