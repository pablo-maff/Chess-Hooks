import { renderPiece } from "../../tools"

const Queen = ({ player }) => {
  const whiteQueen = '♕'
  const blackQueen = '♛'

  return renderPiece(player, whiteQueen, blackQueen)
}

export default Queen