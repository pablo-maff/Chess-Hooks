import { setPieceColor } from "../../tools"

const Knight = ({ player }) => {
  const whiteKnight = '♘'
  const blackKnight = '♞'

  return setPieceColor(player, whiteKnight, blackKnight)
}

export default Knight