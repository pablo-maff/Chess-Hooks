import Square from "./Square"

const Board = ({ squares }) => {
  const renderSquare = (i, squareShade) => (
    <Square 
      key={i}
      keyVal={i}
      style={squares[i] ? squares[i].style : null }
      shade={squareShade}
      onClick={null}
      piece={squares[i]}
    />
  )
  
  const setShade = (i, j) => {
    const isEven = num => num % 2 === 0
    
    const shade = (isEven(i) && isEven(j)) || (!isEven(i) && !isEven(j))
      ? 'light-square'
      : 'dark-square'

    return shade
  }

  const board = []
  for (let i = 0; i < 8; i++) {
    const squareRows =[]
    for (let j = 0; j < 8; j++){
      squareRows.push(
        renderSquare((i * 8) + j, setShade(i, j))
      )
    }
    board.push(
      <div className="board-row" key={i}>{squareRows}</div>
    )
  }

  return (
    <div>
      {board}
    </div>
  )
}

export default Board