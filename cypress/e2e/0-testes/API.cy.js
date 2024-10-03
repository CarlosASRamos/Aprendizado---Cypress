/// <reference types="cypress" />
const dayjs = require('dayjs')

describe('Fazendo um teste API', () => {
    //let token
    beforeEach(() => {
        cy.getToken('jinvolg@gmail.com', 'Luminorin')
            //.then(tkn => {
            //    token = tkn
            //})
        cy.resetRest()
    })
    it('Inserir conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via rest'
            }
        }).as('Response')
        cy.get('@Response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest') 
        })
    })
    it('Alterar conta', () => {
        cy.getAccByName('Conta para movimentacoes').then(contaId => {
            cy.request({
                url: `/contas/${contaId}`,
                method: 'PUT',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    nome: 'conta alterada via rest'
                }
            }).as('Response')
        })
        cy.get('@Response').its('status').should('be.equal', 200)
    })
    it('Inserir conta repetida', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            //headers: {Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false
        }).as('Response')
        cy.get('@Response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!') 
        })
    })
    it('Inserir movimentação', () => {
        cy.getAccByName('Conta para movimentacoes').then(contaId => {
            cy.request({
                url: '/transacoes',
                method: 'POST',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    conta_id:	contaId,
                    data_pagamento:	dayjs().add(1, 'day').format('DD/MM/YYYY'),
                    data_transacao:	dayjs().format('DD/MM/YYYY'),
                    descricao:	"Joguinho",
                    envolvido:	"Steam",
                    status:	true,
                    tipo:	"REC",
                    valor:	"250"
                }
            }).as('Response')
        })
        cy.get('@Response').its('status').should('be.equal', 201)
        cy.get('@Response').its('body.id').should('exist')
    })
    it('Saldo', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //headers: {Authorization: `JWT ${token}`},
            qs: {descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                //headers: {Authorization: `JWT ${token}`},
                body: {
                    status: true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })
        cy.request({
            url: '/saldo',
            method: 'GET',
            //headers: {Authorization: `JWT ${token}`}
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })
    it('Remover movimentação', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            //headers: {Authorization: `JWT ${token}`},
            qs: {descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                //headers: {Authorization: `JWT ${token}`},
            }).its('status').should('be.equal', 204)
        })
    })
})