/// <reference types="Cypress" />

describe('<HomePage /> component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render', () => {
    cy.get('[data-testid="header"]').should('exist')
    cy.get('[data-testid="filterForm"]').should('not.exist')
    cy.get('[data-testid="recipeWrapper"]').contains('Chicken Vesuvio')
    cy.get('[data-testid="recipeWrapper"]').contains('Catalan Chicken')
    cy.get('[data-testid="saved"]')
      .contains('Saved')
      .should('have.attr', 'href', '/saved')
    cy.get('[data-testid="saved"]').click().visit('/saved')
  })

  it('has a searchbar, wich searchs for recipes and displays them', () => {
    cy.get('[data-testid=delete-searchquery]').click()
    cy.get('[data-testid="searchbar"]').should('be.empty')
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
    cy.get('[name="caloriesRangeFrom"]').type('100')
    cy.get('[name="caloriesRangeTo"]').type('400')
    cy.get('[type="checkbox"]').check('Vegetarian')
    cy.get('[type="checkbox"]').check('Egg-free')
    cy.get('[type="checkbox"]').check('Italian')
    cy.get('[data-testid="clearButton"]').click()
    cy.get('[name="caloriesRangeFrom"]').should('be.empty')
    cy.get('[name="caloriesRangeTo"]').should('be.empty')
    cy.get('input[value="Vegetarian"]').should('not.be.checked')
    cy.get('input[value="Egg-free"]').should('not.be.checked')
    cy.get('input[value="Italian"]').should('not.be.checked')
  })
  /*
  it('scroll to top button scrolls to top', () => {
    cy.scrollTo('bottom')
      .document.getElementsByTagName('main')[0]()
      .its('scrollY')
      .should('not.equal', 0)
    cy.get('data-testid="scroll-to-top"]').click()
    cy.document
      .getElementsByTagName('main')[0]()
      .its('scrollY')
      .should('equal', 0)
  })
  */
})
