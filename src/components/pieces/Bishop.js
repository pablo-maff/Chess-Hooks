import { setPieceColor } from "../../tools"

const Bishop = ({ player }) => {
  const whiteBishop = '♗'
  const blackBishop = '♝'

  return setPieceColor(player, whiteBishop, blackBishop)
}

export default Bishop