import { renderPiece } from '../tools'

const Square = ({ shade, selectSquare, style, keyVal, piece }) => {
  const handleClick = () => selectSquare(keyVal)

  return (
    <button className={'square ' + shade}
      id={keyVal}
      onClick={handleClick}
      style={style}
      key={keyVal}
    >
      {renderPiece(piece)}
    </button>
  )
}

export default Square