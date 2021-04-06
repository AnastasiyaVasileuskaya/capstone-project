/// <reference types="Cypress" />

describe('<HomePage /> component', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('has a searchbar, wich searchs for recipes and displays them', () => {
    cy.get('[data-testid=delete-searchquery]').click()
    cy.get('[data-testid="searchbar"]').type('chocolate')
    cy.get('[data-testid=search]').click()
    cy.get('[data-testid="recipeWrapper"]').contains(
      'Chocolate Covered Chocolates Recipe'
    )
    cy.get('[data-testid="recipeWrapper"]').not('Balsamic Fig Sauce')
    cy.get('[data-testid="recipeWrapper"]').not('Beef Brisket')
  })

  it('has a filter form with input fields and checkboxes, wich filters recipes and displays them', () => {
    cy.get('[data-testid="filterButton"]').click()
    // cy.get('[data-testid="filterForm"]').scrollIntoView().should('be.visible')
    cy.get('[name="caloriesRangeFrom"]').type('100')
    cy.get('[name="caloriesRangeTo"]').type('400')
    cy.get('[type="checkbox"]').check('Vegetarian')
    cy.get('[type="checkbox"]').check('Egg-free')
    cy.get('[type="checkbox"]').check('Italian')
    cy.get('[data-testid="findButton"]').click()
    cy.get('[data-testid="recipeWrapper"]').contains(
      'Bruschetta Chicken recipes'
    )
    cy.get('[data-testid="recipeWrapper"]').not('Balsamic Fig Sauce')
    cy.get('[data-testid="recipeWrapper"]').not('Beef Brisket')
  })

  it('filter form should be empty after clear button click', () => {
    cy.get('[data-testid="filterButton"]').click()
    // cy.get('[data-testid="filterForm"]').scrollIntoView().should('be.visible')
    cy.get('[name="caloriesRangeFrom"]').type('100')
    cy.get('[name="caloriesRangeTo"]').type('400')
    cy.get('[type="checkbox"]').check('Vegetarian')
    cy.get('[type="checkbox"]').check('Egg-free')
    cy.get('[type="checkbox"]').check('Italian')
    cy.get('[data-testid="clearButton"]').click()
    cy.get('[name="caloriesRangeFrom"]').type('100').should('be.empty')
    cy.get('[name="caloriesRangeTo"]').type('400').should('be.empty')
    cy.get('[type="checkbox"]').uncheck(['Vegetarian', 'Egg-free', 'Italian'])
  })
})
