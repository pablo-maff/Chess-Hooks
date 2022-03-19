import { renderPiece } from "../../tools"

const Rook = ({ player }) => {
  const whiteRook = '♖'
  const blackRook = '♜'

  return renderPiece(player, whiteRook, blackRook)
}

export default Rook