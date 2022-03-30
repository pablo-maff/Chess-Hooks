import Queen from "./pieces/Queen"
import Rook from "./pieces/Rook"
import Knight from "./pieces/Knight"
import Bishop from "./pieces/Bishop"


const Promotion = ({ player, selectPiece }) => {

  return (
    <div>
      <p><b>To which piece do you want to promote?</b></p>
      <button id="prom-queen" value='queen' onClick={selectPiece}>
        <Queen player={player} />
      </button>
      <button id="prom-rook" value='rook' onClick={selectPiece}>
        <Rook player={player} />
      </button>
      <button id="prom-bishop" value='bishop' onClick={selectPiece}>
        <Bishop player={player} />
      </button>
      <button id="prom-knight" value='knight' onClick={selectPiece}>
        <Knight player={player} />
      </button>

    </div>
  )
}

export default Promotion