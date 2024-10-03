/// <reference types="cypress" />

describe('Work with dinamic tests', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Going back to the past', () => {
        cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '19/09/2024')
        //cy.clock()
        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '31/12/1969')
        const dt = new Date(2018, 1, 12, 18, 26, 30)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '12/02/2018')
    })
    it('Going to the future', () => {
        //cy.get('#buttonTimePassed').click()
        //cy.get('#resultado > span').should('contain', '17267')
        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('lte', 0)
        })
        cy.tick(20000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').then(t => {
            const number = parseInt(t)
            cy.wrap(number).should('gte', 10000)
        })
    })
})