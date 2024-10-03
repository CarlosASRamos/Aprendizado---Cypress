/// <reference types="cypress" />

describe('Work with locators', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Using jquery selector', () => {
        cy.get(':nth-child(1) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get("[onclick*='Francisco']")
        cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3)").type('Achou')
        cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input").type('Achou de novo!')
    })
    it('Using xpath', () => {
        cy.xpath("//input[contains(@onclick, 'Francisco')]")
        cy.xpath("//table[@id='tabelaUsuarios']//td[contains(., 'Francisco')]/..//input[@type='text']")
        cy.xpath("//td[contains(., 'Usuario A')]/following-sibling::td[contains(., 'Mestrado')]/..//input[@type='text']").type('Funciona!')
    })
})