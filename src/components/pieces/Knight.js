import { setPieceColour } from "../../tools"

const Knight = ({ player }) => {
  const whiteKnight = '♘'
  const blackKnight = '♞'

  return setPieceColour(player, whiteKnight, blackKnight)
}

export default Knight