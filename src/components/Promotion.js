import Queen from "./pieces/Queen"
import Rook from "./pieces/Rook"
import Knight from "./pieces/Knight"
import Bishop from "./pieces/Bishop"

const Promotion = ({ player }) => {
  return (
    <div>
      <p><b>To which piece do you want to promote?</b></p>
      <button><Queen player={player}/></button>
      <button><Rook player={player}/></button>
      <button><Bishop player={player}/></button>
      <button><Knight player={player}/></button>

    </div>
  )
}

export default Promotion