import _ from "lodash";
import { useRef } from "react";
import { isEven } from "../tools";
import Square from "./Square"

const Board = ({ board, selectSquare }) => {
  let initialShade = useRef(false)
  let shade = useRef('')

  const selectShade = (squareId) => {
    const row = squareId % 8 === 0

    if (row) initialShade = !initialShade

    initialShade ?
      shade = isEven(squareId) ?
        'dark-square' : 'light-square'
      : shade = isEven(squareId) ?
        'light-square' : 'dark-square'

    return shade
  }

  board = board.map(square => 
    <Square
      key={square.id}
      keyVal={square.id}
      shade={selectShade(square.id)}
      piece={square.piece}
      selectSquare={selectSquare}
    />
  )

  // TODO This should be replaced by flexbox to not have problems with screen resizing
  // Gives final shape to the board separating it by row
  const renderBoard = _.chunk(board, 8).map((square, i) =>
    <div key={i} className='board-row'>{square}</div>
  )

  return (
    <>
      {renderBoard}
    </>
  )
}

export default Board