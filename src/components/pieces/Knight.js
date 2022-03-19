import { renderPiece } from "../../tools"

const Knight = ({ player }) => {
  const whiteKnight = '♘'
  const blackKnight = '♞'

  return renderPiece(player, whiteKnight, blackKnight)
}

export default Knight