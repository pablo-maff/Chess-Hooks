describe('Chess app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('game can be opened and pieces are rendered', function() {
    cy.contains('Chess Game')
    cy.contains('♔')
  })
  describe('Pawns', function() {
    it('can move forward only one square if not in initial position', function() {
      cy.move([55, 47, 8, 16, 47, 31])
      cy.get('#47').contains('♙')
    })

    it('can move forward two squares if placed in initial position', function() {
      cy.move([55, 39]).contains('♙')
    })

    it('can\'t move backwards', function() {
      cy.move([55, 39, 39, 47])
      cy.get('#39').contains('♙')
    })

    it('can\'t move to the side', function() {
      cy.move([52, 44, 44, 45])
      cy.get('#44').contains('♙')
    })

    it('can\'t move in diagonal if the square is empty', function() {
      cy.move([54, 45])
      cy.get('#54').contains('♙')
    })

    it('can destroy an enemy piece to its forward diagonal', function() {
      cy.move([55, 39, 14, 30, 39, 30]).contains('♙')
    })

    it('can destroy an enemy piece using en passant', function() {
      cy.move([55, 37, 11, 27, 37, 29, 12, 28, 29, 20]).contains('♙')
      cy.get('#28').contains('♙').should('not.exist')
    })

    it('can\'t destroy a friendly piece', function() {
      cy.move([55, 47, 54, 47])

      cy.get('#54').contains('♙')
      cy.get('#47').contains('♙')
    })

    it('can\'t jump over other pieces', function() {
      cy.move([51, 35, 15, 23, 35, 27, 8, 16, 27, 19, 11, 27])

      cy.get('#11').contains('♟')
    })

    it('can promote', function () {
      cy.move([54, 38, 14, 30, 53, 37, 30, 37, 38, 30, 6, 21, 30, 22, 15, 23, 22, 14, 10, 18, 14, 6])
      cy.get('#6').contains('♕' || '♗' || '♘' || '♖')
    })
  })
})
