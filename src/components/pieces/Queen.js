import { setPieceColour } from "../../tools"

const Queen = ({ player }) => {
  const whiteQueen = '♕'
  const blackQueen = '♛'

  return setPieceColour(player, whiteQueen, blackQueen)
}

export default Queen