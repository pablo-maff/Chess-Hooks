import { renderPiece } from "../../tools"

const Bishop = ({ player }) => {
  const whiteBishop = '♗'
  const blackBishop = '♝'

  return renderPiece(player, whiteBishop, blackBishop)
}

export default Bishop