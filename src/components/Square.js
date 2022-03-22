import { renderPiece } from '../tools'

const Square = ({ shade, selectSquare, style, keyVal, piece }) => {
  const handleClick = () => selectSquare(keyVal)

  return (
    <button className={'square ' + shade}
      onClick={handleClick}
      style={style}
      key={keyVal}
    >
      {renderPiece(piece)}
      {keyVal}
    </button>
  )
}

export default Square