import { renderPiece } from "../../tools"

const King = ({ player }) => {
  const whiteKing = '♔'
  const blackKing = '♚'

  return renderPiece(player, whiteKing, blackKing)
}

export default King