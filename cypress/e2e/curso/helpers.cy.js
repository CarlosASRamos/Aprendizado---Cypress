/// <reference types="cypress" />

describe('Helpers...', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Wrap', () => {
        const obj = {nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome')

        cy.get('#formNome').type('Funciona!')
        cy.get('#formNome').then($el => {
            cy.wrap($el).type('Funciona via cypress!')
        })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })
        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botao'))
        //promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => {
            console.log(ret)
        })
        cy.get('#buttonList').then(() => console.log('Encontrei o segundo botao'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })

    it('Its...', () => {
        const obj = {nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')
        const obj2 = {nome: 'User', idade: 20, endereco: {rua: 'dos pamonhas'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'pamonhas')
        cy.wrap(obj2).its('endereco.rua').should('contain', 'pamonhas')
        cy.title().its('length').should('be.equal', 20)
    })
    it.only('Invoke...', () => {
        const getValue = () => 1;
        const soma = (a, b) => a + b;
        cy.wrap({fn: getValue}).invoke('fn').should('be.equal', 1)
        cy.wrap({fn: soma}).invoke('fn', 2, 5).should('be.equal', 7)
        cy.get('#formNome').invoke('val', 'Texto via invoke')
        cy.window().invoke('alert', 'PRERIGO')
        cy.get('#resultado')
            .invoke('html', '<input type="button", value="Perdeste"/>')
    })
})