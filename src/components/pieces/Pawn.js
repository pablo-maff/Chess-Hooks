import { setPieceColour } from "../../tools"

const Pawn = ({ player }) => {
  const whitePawn = '♙'
  const blackPawn = '♟'

  return setPieceColour(player, whitePawn, blackPawn)
}

export default Pawn