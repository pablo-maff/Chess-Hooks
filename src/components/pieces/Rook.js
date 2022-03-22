import { setPieceColour } from "../../tools"

const Rook = ({ player }) => {
  const whiteRook = '♖'
  const blackRook = '♜'

  return setPieceColour(player, whiteRook, blackRook)
}

export default Rook