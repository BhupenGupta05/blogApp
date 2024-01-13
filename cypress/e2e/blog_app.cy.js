describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Bhupen Gupta',
      username: 'bhupengupta05',
      password: 'Jelly05fi$h'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
  })
})

describe('Login',function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
    cy.contains('Login').click()
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('bhupengupta05')
    cy.get('#password').type('Jelly05fi$h')
    cy.get('#login-button').click()

    cy.contains('Bhupen Gupta logged in')
  })

  it('fails with wrong credentials', function() {
    cy.get('input:first').type('bhupengupta05')
    cy.get('input:last').type('wrong')
    cy.get('#login-button').click()

    cy.contains('Wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')

    cy.contains('Bhupen Gupta logged in').should('not.exist')
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'bhupengupta05', password: 'Jelly05fi$h' })
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Cypress')
      cy.get('#author').type('Bhupen')
      cy.get('#url').type('https://cypress.org')
      cy.contains('Save').click()
      cy.contains('Cypress Bhupen')
    })
  })

  // I had to hardcode the likes as i wasn't able to come up with a logic
  describe('A blog can be liked', function() {
    beforeEach(function() {
      cy.login({ username: 'bhupengupta05', password: 'Jelly05fi$h' })
    })

    it.only('A blog can be liked', function() {
      cy.get('#toggle-button').click()
      cy.get('#like-button').click()

      cy.get('p').contains(1)
    })
  })
})