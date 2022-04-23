import { useDrag, useDrop } from 'react-dnd'
import { renderPiece } from '../tools'
import { useRef } from 'react'

const Square = ({ shade, selectSquare, squareID, piece, board }) => {
  const ref = useRef(null)
  const handleClick = () => selectSquare(squareID)
  const movePieces = board ? board[squareID].piece.type !== null : null

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: {
      id: squareID,
    },
    canDrag: movePieces,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }), [movePieces])

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item) => {
      selectSquare([item.id, squareID])
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }))

  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{
        cursor: 'move',
        backgroundColor: isOver ? 'yellow' : '',
      }}
      className={'square ' + shade}
      id={squareID}
      onClick={handleClick}
      key={squareID}
    >
      {isDragging ? '' : renderPiece(piece)}
    </div>

  )
}

export default Square