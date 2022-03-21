const Square = ({ shade, onClick, style, keyVal, piece }) => (
    <button className={'square ' + shade}
      onClick={onClick}
      style={style}
      key={keyVal}
    >
    {piece.type}
    {keyVal}
    </button>
  )

export default Square