import _ from 'lodash'
import { useRef } from 'react'
import { isEven } from '../tools'
import Square from './Square'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
      squareID={square.id}
      shade={selectShade(square.id)}
      piece={square.piece}
      selectSquare={selectSquare}
    />
  )

  // Gives final shape to the board separating it by row
  const renderBoard = _.chunk(board, 8).map((row, i) =>
    <div key={i} className='board-row'>{row}</div>
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='chessboard'>
        {renderBoard}
      </div>
    </DndProvider>
  )
}

export default Board