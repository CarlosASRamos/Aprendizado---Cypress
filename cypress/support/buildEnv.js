const buildEnv = () => {
    cy.intercept({
        method: 'POST',
        url: '/signin'
    }, {
        "id": 9999999, "nome": "Wrehas", "token": "Tomorrow is a hope, never a promise"
    }).as('SignIn')

    cy.intercept({
        method: 'GET',
        url: '/saldo'
    }, [
            {"conta_id": 999999999999, "conta": "Jin", "saldo": "444.00"},
            {"conta_id": 888888888888, "conta": "Scott", "saldo": "6969.00"},
            {"conta_id": 777777777777, "conta": "Xerxes", "saldo": "-420.00"},
        ]).as('Saldo')

    cy.intercept({
        method: 'GET',
        url: '/contas'
    },  [
            {"id": 1, "nome": "Jin", "visivel": true, "usuario_id": 99999},
            {"id": 2, "nome": "Scott", "visivel": true, "usuario_id": 99999},
            {"id": 3, "nome": "Xerxes", "visivel": true, "usuario_id": 99999},
            {"id": 4, "nome": "Rayle", "visivel": true, "usuario_id": 99999}
        ]).as('Contas')

    cy.intercept({
        method: 'GET',
        url: '/extrato/**'
    }, [
        {
            "conta": "Conta para movimentacoes",
            "id": 2132419,
            "descricao": "Não",
            "envolvido": "Importa",
            "observacao": null,
            "tipo": "DESP",
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
            "descricao": "Movimentacao para exclusao",
            "envolvido": "AAA",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "-1500.00",
            "status": true,
            "conta_id": 2271204,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta com movimentacao",
            "id": 2131865,
            "descricao": "Movimentacao de conta",
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
            "descricao": "Movimentacao 1, calculo saldo",
            "envolvido": "CCC",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "3500.00",
            "status": false,
            "conta_id": 2271206,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para saldo",
            "id": 2131867,
            "descricao": "Movimentacao 2, calculo saldo",
            "envolvido": "DDD",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "-1000.00",
            "status": true,
            "conta_id": 2271206,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para saldo",
            "id": 2131868,
            "descricao": "Movimentacao 3, calculo saldo",
            "envolvido": "EEE",
            "observacao": null,
            "tipo": "REC",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "1534.00",
            "status": true,
            "conta_id": 2271206,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        },
        {
            "conta": "Conta para extrato",
            "id": 2131869,
            "descricao": "Movimentacao para extrato",
            "envolvido": "FFF",
            "observacao": null,
            "tipo": "DESP",
            "data_transacao": "2024-09-26T03:00:00.000Z",
            "data_pagamento": "2024-09-26T03:00:00.000Z",
            "valor": "-220.00",
            "status": true,
            "conta_id": 2271207,
            "usuario_id": 55635,
            "transferencia_id": null,
            "parcelamento_id": null
        }
    ]).as('Extrato')
}

export default buildEnv