import { renderPiece } from "../../tools"

const Pawn = ({ player }) => {
  const whitePawn = '♙'
  const blackPawn = '♟'

  return renderPiece(player, whitePawn, blackPawn)
}

export default Pawn