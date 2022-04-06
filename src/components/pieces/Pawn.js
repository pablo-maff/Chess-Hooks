import { setPieceColor } from '../../tools'

const Pawn = ({ player }) => {
  const whitePawn = '♙'
  const blackPawn = '♟'

  return setPieceColor(player, whitePawn, blackPawn)
}

export default Pawn