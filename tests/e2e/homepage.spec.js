/// <reference types="Cypress" />

describe('<HomePage />', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render', () => {
    cy.get('[data-testid="header"]').should('exist')
    cy.get('[data-testid="searchbar"]').should('exist')
    cy.get('[data-testid="content"]').should('exist')
    cy.get('[data-testid="searchbar"]').type('chocolate')
    cy.get('[data-testid=search]').click()
    cy.url().should('eq', 'http://localhost:3000/recipes?query=chocolate')
    cy.get('[data-testid="recipes"]').contains(
      'Chocolate Covered Chocolates Recipe'
    )
  })
})
