import _ from "lodash";
import { useRef } from "react";
import { isEven } from "../tools";
import Square from "./Square"

const Board = ({ squares }) => {
  let initialShade = useRef(false)
  let shade = useRef('')

  const selectShade = (squareId) => {
    let row = squareId % 8 === 0

    if (row) initialShade = !initialShade

    initialShade ?
      shade = isEven(squareId) ?
      'dark-square' : 'light-square'
      : shade = isEven(squareId) ?
      'light-square' : 'dark-square'

    return shade
  }

  squares = squares.map(square =>
    <Square 
      key={square.id}
      keyVal={square.id}
      shade={selectShade(square.id)}
      onClick={null}
      piece={square.piece}
    />
    )

  // Gives final shape to the board separating it by row
  const board = _.chunk(squares, 8).map((square, i) =>
    <div key={i} className='board-row'>{square}</div>
    )

  return (
    <>
      {board}
    </>
  )
}

export default Board