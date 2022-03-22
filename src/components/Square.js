
const Square = ({ shade, selectSquare, style, keyVal, piece }) => {
  const handleClick = () => selectSquare(keyVal)

  return (
    <button className={'square ' + shade}
      onClick={handleClick}
      style={style}
      key={keyVal}
    >
      {piece.type.render}
      {keyVal}
    </button>
  )
}

export default Square