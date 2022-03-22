import { setPieceColour } from "../../tools"

const Bishop = ({ player }) => {
  const whiteBishop = '♗'
  const blackBishop = '♝'

  return setPieceColour(player, whiteBishop, blackBishop)
}

export default Bishop