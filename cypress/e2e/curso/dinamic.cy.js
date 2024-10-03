/// <reference types="cypress" />

describe('Work with dinamic tests', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
        it(`Cadastro com ${food}`, () => {
            cy.get('#formNome').type('Jin')
            cy.get('#formSobrenome').type('Volg')
            cy.get('[name=formSexo][value=F]').click()
            cy.xpath(`//label[contains(., '${food}')]/../input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
            cy.get('#formCadastrar').click()
            cy.get('body > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })
    it.only('Deve selecionar todas as opções usando Each', () => {
        cy.get('#formNome').type('Jin')
        cy.get('#formSobrenome').type('Volg')
        cy.get('[name=formSexo][value=F]').click()
        //cy.get('[name=formComidaFavorita]').click({multiple: true})
        cy.get('[name=formComidaFavorita]').each($el => {
            //$el.trigger("click")
            if($el.val() != 'vegetariano')
                cy.wrap($el).click()
        })
        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.get('#formCadastrar').click()
        cy.get('body > :nth-child(1)').should('contain', 'Cadastrado!')
        //cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })
})