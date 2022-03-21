const Square = ({ shade, onClick, style, keyVal, piece }) => {
  console.log(piece);
  return <button className={'square ' + shade}
    onClick={onClick}
    style={style}
    key={keyVal}
  >
    {piece.type.render}
    {keyVal}
  </button>
}

export default Square