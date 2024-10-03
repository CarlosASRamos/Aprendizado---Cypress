/// <reference types="cypress" />

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Fazendo um teste funcional', () => {
    beforeEach(() => {
        buildEnv()
        cy.Login('jinvolg@gmail.com', 'Bleep')
    })
    it('Inserir conta', () => {
        cy.intercept({
            method: 'POST', 
            url: '/contas'
        }, { 
            "id": 5, "nome": "Ryuu", "visivel": true, "usuario_id": 99999
        }).as('Add Conta')
        cy.AcessarMenuConta()
        cy.intercept({
            method: 'GET',
            url: '/contas'
        },  [
                {"id": 1, "nome": "Jin", "visivel": true, "usuario_id": 99999},
                {"id": 2, "nome": "Scott", "visivel": true, "usuario_id": 99999},
                {"id": 3, "nome": "Xerxes", "visivel": true, "usuario_id": 99999},
                {"id": 4, "nome": "Rayle", "visivel": true, "usuario_id": 99999},
                {"id": 5, "nome": "Ryuu", "visivel": true, "usuario": 99999}
            ]).as('Contas')
        cy.get(loc.CONTAS.NOME).type('Ryuu')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })
    it('Alterar conta', () => {
        cy.intercept({
            method: 'PUT',
            url: '/contas/**'
        }, {
            "id": 4, "nome": "Luminorin", "visivel": true, "usuario_id": 99999
        })
        cy.AcessarMenuConta()
        //cy.get('table  tbody tr td a .fa-edit:eq(0)').click()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Rayle')).click()
        cy.get(loc.CONTAS.NOME).type('{selectAll}{backspace}Luminorin')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })
    it('Conta com mesmo nome', () => {
        cy.intercept({
            method: 'POST',
            url: '/contas'
        }, {
            "error": "Já existe uma conta com esse nome!",
            "statusCode": 400
        }).as('ContaRepetida')
        cy.AcessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Jin')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })
    it('Inserindo movimentação', () => {
        cy.intercept({
            method: 'POST',
            url: '/transacoes'
        }, {
            'fixture': 'movimentacao'
        }).as('Add Transação')
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Commission')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Artista')
        cy.get(loc.MOVIMENTACAO.VALOR).type('100')
        cy.get(loc.MOVIMENTACAO.DESPESA).click()
        cy.get(loc.MOVIMENTACAO.TOGGLE_PAGO).click()
        cy.get(loc.MOVIMENTACAO.SELECIONADOR_CONTA).select('Xerxes')
        cy.get(loc.MOVIMENTACAO.SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
    })
    it('Saldo', () => {
        cy.intercept({
            method: 'GET',
            url: '/transacoes/**'
        }, {
            "conta": "Scott",
            "id": 2131866,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "3500.00",
            "status": true,
            "conta_id": 2271206,
            "usuario_id": 99999,
            "transferencia_id": null,
            "parcelamento_id": null
        }).as('Mudando Transação')
        cy.intercept({
            method: 'PUT',
            url: '/transacoes/**'
        }, {
            "conta": "Scott",
            "id": 2131866,
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "3500.00",
            "status": true,
            "conta_id": 2271206,
            "usuario_id": 99999,
            "transferencia_id": null,
            "parcelamento_id": null
        }).as('Mudando Saldo')
        cy.xpath(loc.SALDO.FN_XP_SALDO('Scott')).should('contain', '6.969')
        cy.xpath(loc.SALDO.FN_XP_SALDO('Total')).should('contain', '6.993')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_EDIT('Movimentacao 1')).click()
        cy.get(loc.MOVIMENTACAO.TOGGLE_PAGO).click()
        cy.get(loc.MOVIMENTACAO.SALVAR).click()
        cy.intercept({
            method: 'GET',
            url: '/saldo'
        }, [
                {"conta_id": 999999999999, "conta": "Jin", "saldo": "444.00"},
                {"conta_id": 888888888888, "conta": "Scott", "saldo": "4034.00"},
                {"conta_id": 777777777777, "conta": "Xerxes", "saldo": "-420.00"},
            ]).as('SaldoFinal')
        cy.get(loc.MENU.HOME).click()
        cy.xpath(loc.SALDO.FN_XP_SALDO('Scott')).should('contain', '4.034')
        cy.xpath(loc.SALDO.FN_XP_SALDO('Total')).should('contain', '4.058')
    })
    it('Removendo movimentação', () => {
        cy.intercept({
            method: 'DELETE',
            url: '/transacoes/**'
        }, {
            statusCode: 204
        }).as('Delete')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_EXCLUIR('Movimentacao para exclusao')).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })
    it('Validação de dados', () => {
        cy.intercept({
            method: 'POST', 
            url: '/contas',
        }, { 
            "id": 5, "nome": "Ryuu", "visivel": true, "usuario_id": 99999,
        }).as('Add Conta')
        cy.AcessarMenuConta()
        cy.intercept({
            method: 'GET',
            url: '/contas'
        },  [
                {"id": 1, "nome": "Jin", "visivel": true, "usuario_id": 99999},
                {"id": 2, "nome": "Scott", "visivel": true, "usuario_id": 99999},
                {"id": 3, "nome": "Xerxes", "visivel": true, "usuario_id": 99999},
                {"id": 4, "nome": "Rayle", "visivel": true, "usuario_id": 99999},
                {"id": 5, "nome": "Ryuu", "visivel": true, "usuario": 99999}
            ]).as('Contas')
        cy.get(loc.CONTAS.NOME).type('Ryuu')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.wait('@Add Conta').its('request.body.nome').should('not.be.empty')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
    })
    it('Testar as cores', () => {
        cy.intercept({
            method: 'GET',
            url: '/extrato/**'
        }, [
            {
            "conta": "Conta para movimentacoes",
            "id": 2132419,
            "descricao": "Receita Paga",
            "envolvido": "Importa",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "-123123.00",
            "status": true,
            "conta_id": 2271204,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para movimentacoes",
            "id": 2131864,
            "descricao": "Receita Não Paga",
            "envolvido": "AAA",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "-1500.00",
            "status": false,
            "conta_id": 2271204,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta com movimentacao",
            "id": 2131865,
            "descricao": "Despesa Paga",
            "envolvido": "BBB",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "-1500.00",
            "status": true,
            "conta_id": 2271205,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para saldo",
            "id": 2131866,
            "descricao": "Despesa Não Paga",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 2271206,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        }
    ]).as('Extrato')
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath(loc.EXTRATO.FN_XP_ITEM('Receita Paga')).should('have.class', 'receitaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_ITEM('Receita Não Paga')).should('have.class', 'receitaPendente')
        cy.xpath(loc.EXTRATO.FN_XP_ITEM('Despesa Paga')).should('have.class', 'despesaPaga')
        cy.xpath(loc.EXTRATO.FN_XP_ITEM('Despesa Não Paga')).should('have.class', 'despesaPendente')
    })
    it('Responsividade', () => {
        cy.get(loc.MENU.HOME).should('exist').and('be.visible')
        cy.viewport(500, 700)
        cy.get(loc.MENU.HOME).should('exist').and('not.be.visible')
        cy.viewport('iphone-5')
        cy.get(loc.MENU.HOME).should('exist').and('not.be.visible')
        cy.viewport('ipad-2')
        cy.get(loc.MENU.HOME).should('exist').and('be.visible')
    })
})