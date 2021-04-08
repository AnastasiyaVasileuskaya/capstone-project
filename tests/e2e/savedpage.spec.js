/// <reference types="Cypress" />

describe('<SavedRecipes /> component', () => {
  beforeEach(() => {
    cy.visit('/recipes/recipe_03e61ddd90bcc170639178a19cf665eb')
  })

  it('should render', () => {
    cy.get('[data-testid="save-recipe-button"]').click()
    cy.get('[data-testid="saved-recipes"]').click().visit('/saved')

    cy.get('[data-testid="header"]').should('exist')
    cy.get('[data-testid="search-input"]').should('exist')
    cy.get('[data-testid="dropdown"]')
      .should('exist')
      .contains('Rate: High To Low')
    cy.get('[data-testid="saved-recipes-wrapper"]').contains(
      'Quick Broiled Shrimp With Harissa and Beer Recipe'
    )
    cy.get('[data-testid="all-recipes"]')
      .contains('All')
      .should('have.attr', 'href', '/')
    cy.get('[data-testid="all-recipes"]').click().visit('/')
  })

  it('recipe can be deleted', () => {
    cy.get('[data-testid="save-recipe-button"]').click()
    cy.get('[data-testid="saved-recipes"]').click().visit('/saved')
    cy.get('[data-testid="recipe-delete"]').click()
    cy.get('[data-testid="saved-recipes-text"]').contains(
      "You haven't saved recipes yet."
    )
  })

  it('dropdown sort by rate and rate date', () => {
    cy.get('[data-testid="save-recipe-button"]').click()
    cy.get('[data-testid="star-3"]').click()
    cy.get('[data-testid="rate-button"]').click()
    cy.visit('/recipes/recipe_8076157b4a84bc31b0dad57473f117dc')
    cy.get('[data-testid="save-recipe-button"]').click()
    cy.get('[data-testid="star-4"]').click()
    cy.get('[data-testid="rate-button"]').click()
    cy.visit('/recipes/recipe_d8c5cf9c5b09b02e6ac514551e6ae7dd')
    cy.get('[data-testid="save-recipe-button"]').click()
    cy.get('[data-testid="star-5"]').click()
    cy.get('[data-testid="rate-button"]').click()
    cy.visit('/saved')
    cy.get('[data-testid="dropdown"]').click()
    cy.get('[data-testid="dropdown-low-to-high"]').click()
    cy.get('[data-testid="saved-recipes-wrapper"]')
      .first()
      .contains('Quick Broiled Shrimp With Harissa and Beer Recipe')
    cy.get('[data-testid="dropdown"]').click()
    cy.get('[data-testid="dropdown-newest-first"]').click()
    cy.get('[data-testid="saved-recipes-wrapper"]')
      .first()
      .contains('New Orleans Barbecue Shrimp')
  })
})
/*
cy.get('[data-testid="search-input"]').type('garlic')
cy.get('[data-testid="saved-recipes-wrapper"]').contains(
  'Beer-Steamed Shrimp With Garlic'
)
cy.get('[data-testid="delete-button"]').click()
cy.get('[data-testid="search-input"]').should('be.empty')
*/
