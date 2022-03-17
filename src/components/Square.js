const Square = ({ shade, onClick, style, keyVal }) => (
  <button className={'square ' + shade}
    onClick={onClick}
    style={style}
    key={keyVal}
  />
)

export default Square