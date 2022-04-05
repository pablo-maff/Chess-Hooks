import { setPieceColor } from '../../tools'

const Queen = ({ player }) => {
  const whiteQueen = '♕'
  const blackQueen = '♛'

  return setPieceColor(player, whiteQueen, blackQueen)
}

export default Queen