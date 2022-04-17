import { useDrag, useDrop } from 'react-dnd'
import { renderPiece } from '../tools'
import { useRef } from 'react'

const Square = ({ shade, selectSquare, squareID, piece }) => {
  const ref = useRef(null)
  const handleClick = () => selectSquare(squareID)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { id: squareID },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()

    })
  }))

  // eslint-disable-next-line no-unused-vars
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item) => selectSquare([item.id, squareID]),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    }),
  }), [squareID])

  // Initialize drag and drop into the element using its reference.
  drag(drop(ref))

  return (
    <button
      ref={ref}
      style={{
        cursor: 'move',
        backgroundColor: isDragging ? 'yellow' : ''
      }}
      className={'square ' + shade}
      id={squareID}
      onClick={handleClick}
      key={squareID}
    >
      {isDragging ? '' : renderPiece(piece)}
    </button>

  )
}

export default Square