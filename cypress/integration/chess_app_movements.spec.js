describe('Chess app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  
  it('game can be opened and pieces are rendered', function() {
    cy.contains('Chess Game')
    cy.contains('♔')
  })

  describe('Turn', function() {
    it('pieces can\'t move if it\'s not their turn', function() {
      cy.move([8, 16]).contains('♟').should('not.exist')
    })

    it('pieces can move respecting their turn', function() {
      cy.move([52, 36, 11, 27, 49, 41]).contains('♙')
    })
  })

  describe('Check', function() {
    it('can\'t move a piece that is not protecting from checkmate', function() {
      cy.move([52, 44, 11, 19, 61, 25, 12, 20]).contains('♟').should('not.exist')
    })

    it('can move a piece to protect from checkmate', function() {
      cy.move([52, 44, 11, 19, 61, 25, 3, 11]).contains('♛')
    })

    it('pieces can\'t move after checkmate', function() {
      cy.move([53, 45, 12, 20, 54, 38, 3, 39, 55, 47])
      .contains('♙').should('not.exist')
    })
  })

  describe('Promotion', function(){
    it('can promote', function () {
      cy.move([54, 38, 14, 30, 53, 37, 30, 37, 38, 30, 6, 21, 30, 22, 15, 23, 22, 14, 10, 18, 14, 6])
      cy.get('#prom-queen').click()
      cy.get('#6').contains('♕')
    })

    it('can move any piece if player is about to promote', function() {
      cy.move([54, 38, 14, 30, 53, 37, 30, 37, 38, 30, 6, 21, 30, 22, 15, 23, 22, 14, 10, 18, 55, 47])
        .contains('♙')
    })

    it('can move any piece if player is about to promote and next turn belongs to his opponent', function() {
      cy.move([54, 38, 14, 30, 53, 37, 30, 37, 38, 30, 6, 21, 30, 22, 15, 23, 22, 14, 10, 18, 55, 47, 1, 16])
        .contains('♞')
    })

    it.only('only pawns can promote', function() {
      cy.move([52, 36, 13, 29, 61, 34, 15, 23, 34, 6])
      cy.get('#prom-queen').should('not.exist')
    })
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

    it('can\'t destroy an enemy piece moving forward', function() {
      cy.move([55, 39, 15, 31, 39, 31]).contains('♟')
    })

    // TODO add more test cases for all the en passant rules
    it('can destroy an enemy piece using en passant', function() {
      cy.move([53, 37, 11, 27, 37, 29, 12, 28, 29, 20]).contains('♙')
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
  })

  describe('Rook', function() {
    it('can move up, down, left and right all the squares you want', function() {
      cy.move([55, 39, 14, 30, 39, 30, 9, 25, 63, 23]).contains('♖')
      cy.move([12, 28, 23, 16]).contains('♖')
      cy.move([10, 26, 16, 40]).contains('♖')
      cy.move([8, 16, 40, 47]).contains('♖')
    })
    
    it('can\'t move in diagonal', function() {
      cy.move([54, 46, 13, 21, 63, 27]).contains('♖').should('not.exist')
    })

    it('can\'t jump over other pieces', function() {
      cy.move([63, 47]).contains('♖').should('not.exist')
    })

    it('can destroy enemy pieces', function () {
      cy.move([55, 39, 14, 30, 39, 30, 8, 16, 63, 15]).contains('♖')
    })

    it('can\'t destroy friendly pieces', function() {
      cy.move([63, 55]).contains('♙')
    })
  })

  describe('Knight', function() {
    it('can move in L shape', function() {
      cy.move([62, 45, 11, 19, 45, 30, 8, 16, 30, 36, 9, 17, 36, 46]).contains('♘')
    })

    it('can\'t exploit big jump bugs due to the nature of the board', function() {
      cy.move([57, 40, 10, 18, 40, 23]).contains('♘').should('not.exist')
      cy.visit('http://localhost:3000')
      cy.move([49, 41, 6, 23, 50, 42, 23, 40]).contains('♞').should('not.exist')
      cy.visit('http://localhost:3000')
      cy.move([55, 47, 1, 16, 54, 46, 16, 31]).contains('♞').should('not.exist')
      cy.visit('http://localhost:3000')
      cy.move([49, 41, 6, 21, 50, 42, 21, 31, 52, 44, 31, 16]).contains('♞').should('not.exist')
      cy.visit('http://localhost:3000')
      cy.move([57, 40, 8, 16, 40, 30]).contains('♘').should('not.exist')
      cy.visit('http://localhost:3000')
      cy.move([62, 45, 8, 16, 45, 30, 9, 17, 30, 40]).contains('♘').should('not.exist')

    })

    it('can\'t move in any other way', function() {
      cy.move([62, 45, 45, 38, 45, 29, 45, 42, 45, 27])

      cy.get('#45').contains('♘')
    })

    it('can destroy enemy pieces', function() {
      cy.move([62, 45, 12, 28, 45, 28]).contains('♘')
    })

    it('can\'t destroy friendly pieces', function() {
      cy.move([62, 52]).contains('♙')
    })
  })

  describe('Bishop', function() {
    it('can move in diagonal', function() {
      cy.move([52, 44, 8, 16, 61, 34, 15, 23, 34, 20, 9, 17, 20, 38, 11, 19, 38, 52]).contains('♗')
    })

    it('can\'t move in any other way', function() {
      cy.move([52, 44, 15, 23, 61, 34, 14, 15, 34, 37, 34, 32, 34, 18, 34, 42])

      cy.get('#34').contains('♗')
    })

    it('can\'t jump over other pieces', function() {
      cy.move([61, 43]).contains('♗').should('not.exist')
    })

    it('can destroy enemy pieces', function() {
      cy.move([52, 44, 8, 16, 61, 16]).contains('♗')
    })

    it('can\'t destroy friendly pieces', function() {
      cy.move([62, 53]).contains('♙')
    })
  })

  describe('Queen', function() {
    it('can move in any direction', function() {
      cy.move([52, 44, 8, 16, 59, 45, 9, 17, 45, 27, 16, 24, 27, 29, 15, 23, 29, 25, 14, 22, 25, 33, 13, 21, 33, 40])
      .contains('♕')
    })
    
    it('can\'t jump over other pieces', function() {
      cy.move([59, 43]).contains('♕').should('not.exist')
    })

    it('can destroy enemy pieces', function() {
      cy.move([51, 35, 12, 28, 35, 28, 8, 16, 59, 11]).contains('♕')
    })

    it('can\'t destroy friendly pieces', function() {
      cy.move([59, 51]).contains('♙')
    })
  })

  describe('King', function() {
    it('can move in any direction', function() {
      cy.move([52, 44, 12, 20, 60, 52, 15, 23, 52, 45, 8, 16, 45, 36, 9, 17, 36, 37, 10, 18, 37, 36, 11, 19, 36, 43, 13, 21, 43, 52])
      .contains('♔')
    })

    it('can\'t move more than one square per turn', function() {
      cy.move([52, 36, 8, 16, 60, 44])

      cy.get('#60').contains('♔')
    })

    it('can destroy enemy pieces', function() {
      cy.move([52, 36, 13, 29, 48, 40, 29, 36, 60, 52, 36, 44, 52, 44])
      .contains('♔')
    })

    it('can\'t destroy friendly pieces', function() {
      cy.move([60, 52]).contains('♙')
    })
  })
})
