/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Fazendo um teste funcional', () => {
    beforeEach(() => {
        cy.Login('jinvolg@gmail.com', 'Luminorin')
        cy.ContaReset()
        cy.wait(3000)
    })
    it.only('Inserir conta', () => {
        cy.AcessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Nova conta')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })
    it('Alterar conta', () => {
        cy.AcessarMenuConta()
        //cy.get('table  tbody tr td a .fa-edit:eq(0)').click()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
        cy.get(loc.CONTAS.NOME).type('{selectAll}{backspace}Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })
    it('Conta com mesmo nome', () => {
        cy.AcessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })
    it('Inserindo movimentação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Commission')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Artista')
        cy.get(loc.MOVIMENTACAO.VALOR).type('100')
        cy.get(loc.MOVIMENTACAO.DESPESA).click()
        cy.get(loc.MOVIMENTACAO.TOGGLE_PAGO).click()
        cy.get(loc.MOVIMENTACAO.SELECIONADOR_CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
    })
    it.only('Saldo', () => {
        cy.xpath(loc.SALDO.FN_XP_SALDO('Conta para saldo')).should('contain', '534')
        cy.xpath(loc.SALDO.FN_XP_SALDO('Total')).should('contain', '2.686')
        cy.get(loc.MENU.EXTRATO).click()
        cy.wait(3000)
        cy.xpath(loc.EXTRATO.FN_XP_EDIT('Movimentacao 1')).click()
        cy.wait(2000)
        cy.get(loc.MOVIMENTACAO.TOGGLE_PAGO).click()
        cy.get(loc.MOVIMENTACAO.SALVAR).click()
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO('Conta para saldo')).should('contain', '4.034')
        cy.xpath(loc.SALDO.FN_XP_SALDO('Total')).should('contain', '814')
    })
    it('Removendo movimentação', () => {
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_EXCLUIR('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })
})