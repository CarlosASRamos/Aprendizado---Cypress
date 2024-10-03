/// <reference types="cypress" />

describe('Desafio: Validar Mensagens', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Cadastrar', () => {
        const stub = cy.stub().as('Alerta')
        cy.on('window:alert', stub)
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio')
        })
        cy.get('#formNome').type('Jin')
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio')
        })
        cy.get('[data-cy="dataSobrenome"]').type('Volg')
        cy.get('#formCadastrar').click().then(() => {
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio')
        })
        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()
        cy.get('body > :nth-child(1)').should('contain', 'Cadastrado!')
    })
})