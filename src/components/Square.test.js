import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Square from './Square'

const square = {
  id: 1,
  piece: [
    { type: null }, { type: 'pawn' }
  ]
}

describe('Renders', () => {
  test('an empty square', () => {

    render(
      <DndProvider backend={HTML5Backend}>
        <div data-testid={square.id}>
          <Square
            piece={square.piece[0]}
          />
        </div>
      </DndProvider>

    )

    const squareId = screen.getByTestId('1')
    expect(squareId).toBeDefined()
  })

  test('a square with a piece', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <div data-testid={square.id}>
          <Square
            piece={square.piece[1]}
          />
        </div>
      </DndProvider>
    )

    const squareId = screen.getByTestId('1')
    const piece = screen.getByText('♙')
    expect(squareId).toBeDefined()
    expect(piece).toBeDefined()
  })
})