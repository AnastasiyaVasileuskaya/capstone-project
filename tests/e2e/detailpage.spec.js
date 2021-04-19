/// <reference types="Cypress" />

describe('<DetailPage />', () => {
  beforeEach(() => {
    cy.visit('/recipes/recipe_03e61ddd90bcc170639178a19cf665eb')
  })

  it('should render', () => {
    cy.get('[data-testid="header"]').should('exist')
    cy.get('[data-testid="recipe-information"]').contains(
      'Quick Broiled Shrimp With Harissa and Beer Recipe'
    )
    cy.get('[data-testid="rating-form"]').should('not.exist')
    cy.get('[data-testid="back-button"]').click().visit('/recipes')
    cy.get('[data-testid="home"]').click().visit('/')
    cy.get('[data-testid="saved"]').click().visit('/saved')
    cy.get('[data-testid="saved-recipes-text"]').contains(
      "You haven't saved recipes yet."
    )
  })

  it('recipe will be saved after save recipe button click', () => {
    cy.get('[data-testid="save-recipe-button"]').click()
    cy.get('[data-testid="rating-form"]').scrollIntoView().should('be.visible')
    cy.get('[data-testid="save-recipe-button"]').contains('Recipe saved')
    cy.get('[data-testid="saved"]').click().visit('/saved')
    cy.get('[data-testid="saved-recipes-wrapper"]').contains(
      'Quick Broiled Shrimp With Harissa and Beer Recipe'
    )
  })

  it('rating will be saved after rate button click', () => {
    cy.get('[data-testid="save-recipe-button"]').click()
    cy.get('[data-testid="star-3"]').click()
    cy.get('[data-testid="comment-textarea"]').type('Tasty')
    cy.get('[data-testid="rate-button"]').click()
    cy.get('[data-testid="rating-form"]').should('not.exist')
  })

  it('rating can be edited after edit button click', () => {
    cy.get('[data-testid="save-recipe-button"]').click()
    cy.get('[data-testid="star-3"]').click()
    cy.get('[data-testid="comment-textarea"]').type('Tasty')
    cy.get('[data-testid="rate-button"]').click()
    cy.get('[data-testid="recipe-rating"]')
      .scrollIntoView()
      .should('be.visible')
    cy.get('[data-testid="recipe-rating"]').contains('Tasty')
    cy.get('[data-testid="edit"]').should('be.visible')
    cy.get('[data-testid="rating-date"]').should('be.visible')
    cy.get('[data-testid="stars-container"]').should('be.visible')
    cy.get('[data-testid="edit"]').click()
    cy.get('[data-testid="star-5"]').click()
    cy.get('[data-testid="comment-textarea"]').clear()
    cy.get('[data-testid="comment-textarea"]').type('Very tasty')
    cy.get('[data-testid="rate-button"]').click()
    cy.get('[data-testid="recipe-rating"]').contains('Very tasty')
  })

  it('should redirect to external website when instruction button clicked', () => {
    cy.get('[data-testid="full-instruction-button"]').click()
  })
})
