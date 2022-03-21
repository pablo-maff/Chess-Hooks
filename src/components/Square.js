const Square = ({ shade, selectSquare, style, keyVal, piece }) => (
    <button className={'square ' + shade}
      onClick={() => selectSquare(keyVal)}
      style={style}
      key={keyVal}
    >
    {piece.type.render}
    {keyVal}
    </button>
  )

export default Square