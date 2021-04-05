/// <reference types="Cypress" />

describe('<Tags /> component', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should render', () => {
    cy.get('input[name="tags"]').should('exist')
  })
})
