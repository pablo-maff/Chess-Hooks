import { setPieceColor } from '../../tools'

const Rook = ({ player }) => {
  const whiteRook = '♖'
  const blackRook = '♜'

  return setPieceColor(player, whiteRook, blackRook)
}

export default Rook