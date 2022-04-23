import Queen from './pieces/Queen'
import Rook from './pieces/Rook'
import Knight from './pieces/Knight'
import Bishop from './pieces/Bishop'


const Promotion = ({ player, selectPiece }) => {

  const selectColor = player === 'white' ? 'white' : 'black'


  return (
    <div className='promotion'>
      <p>Promote!</p>
      <button style={{ color: selectColor }} id="prom-queen" value='queen' onClick={selectPiece}>
        <Queen player={player} />
      </button>
      <button style={{ color: selectColor }} id="prom-rook" value='rook' onClick={selectPiece}>
        <Rook player={player} />
      </button>
      <button style={{ color: selectColor }} id="prom-bishop" value='bishop' onClick={selectPiece}>
        <Bishop player={player} />
      </button>
      <button style={{ color: selectColor }} id="prom-knight" value='knight' onClick={selectPiece}>
        <Knight player={player} />
      </button>
    </div>
  )
}

export default Promotion