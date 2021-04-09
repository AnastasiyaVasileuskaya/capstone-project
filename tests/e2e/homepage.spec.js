/// <reference types="Cypress" />

describe('<HomePage />', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should render', () => {
    cy.get('[data-testid="header"]').should('exist')
    cy.get('[data-testid="filter-button"]').should('exist')
    cy.get('[data-testid="filter-form"]').should('not.exist')
    cy.get('[data-testid="recipes"]').contains('Chicken Vesuvio')
    cy.get('[data-testid="recipes"]').contains('Catalan Chicken')
    cy.get('[data-testid="saved-recipes"]')
      .contains('Saved')
      .should('have.attr', 'href', '/saved')
    cy.get('[data-testid="saved-recipes"]').click().visit('/saved')
  })

  it('has a searchbar, wich searchs for recipes and displays them', () => {
    cy.get('[data-testid=delete-searchquery]').click()
    cy.get('[data-testid="searchbar"]').should('be.empty')
    cy.get('[data-testid="searchbar"]').type('chocolate')
    cy.get('[data-testid=search]').click()
    cy.get('[data-testid="recipes"]').contains(
      'Chocolate Covered Chocolates Recipe'
    )
    cy.get('[data-testid="recipes"]').not('Balsamic Fig Sauce')
    cy.get('[data-testid="recipes"]').not('Beef Brisket')
  })

  it('has a filter form with input fields and checkboxes, wich filters recipes and displays them', () => {
    cy.get('[data-testid="filter-button"]').click()
    cy.get('[name="caloriesRangeFrom"]').type('100')
    cy.get('[name="caloriesRangeTo"]').type('400')
    cy.get('[type="checkbox"]').check('Vegetarian')
    cy.get('[type="checkbox"]').check('Egg-free')
    cy.get('[type="checkbox"]').check('Italian')
    cy.get('[data-testid="find-button"]').click()
    cy.get('[data-testid="recipes"]').contains('Chicken Alfredo')
    cy.get('[data-testid="recipes"]').not('Balsamic Fig Sauce')
    cy.get('[data-testid="recipes"]').not('Beef Brisket')
  })

  it('filter form should be cleared after clear button click', () => {
    cy.get('[data-testid="filter-button"]').click()
    cy.get('[name="caloriesRangeFrom"]').type('100')
    cy.get('[name="caloriesRangeTo"]').type('400')
    cy.get('[type="checkbox"]').check('Vegetarian')
    cy.get('[type="checkbox"]').check('Egg-free')
    cy.get('[type="checkbox"]').check('Italian')
    cy.get('[data-testid="clear-button"]').click()
    cy.get('[name="caloriesRangeFrom"]').should('be.empty')
    cy.get('[name="caloriesRangeTo"]').should('be.empty')
    cy.get('input[value="Vegetarian"]').should('not.be.checked')
    cy.get('input[value="Egg-free"]').should('not.be.checked')
    cy.get('input[value="Italian"]').should('not.be.checked')
  })

  it('page layout scrolls to top after scroll to top button click', () => {
    cy.get('[data-testid="recipes"]')
      .scrollTo('bottom')
      .its('scrollY')
      .should('not.equal', 0)
    cy.get('[data-testid="scroll-to-top-button"]').click()
  })

  it('clicking the recipe card causes the browser to open detail page of this recipe', () => {
    cy.contains('Chicken Vesuvio').click()
    cy.url().should(
      'eq',
      'http://localhost:3000/recipes/recipe_b79327d05b8e5b838ad6cfd9576b30b6'
    )
  })
})
