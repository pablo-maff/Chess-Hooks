import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Square from './Square'

const square = {
  id: 1,
  piece: [
    {type: null}, {type: 'pawn'}
    ]
}

describe('Renders', () => {
  test('an empty square', () => {
    
  render(
    <div data-testid={square.id}>
      <Square
        piece={square.piece[0]}
      />
    </div>
      )

  const squareId = screen.getByTestId('1')
  expect(squareId).toBeDefined()
  })

  test('a square with a piece', () => {
    render(
      <div data-testid={square.id}>
        <Square
          piece={square.piece[1]}
        />
      </div>
        )
    
    const squareId = screen.getByTestId('1')
    const piece = screen.getByText('♙')
    expect(squareId).toBeDefined()
    expect(piece).toBeDefined()
  })
})