const locators = {
    LOGIN: {
        USER: '.input-group > .form-control',
        PASSWORD: ':nth-child(2) > .form-control',
        BTN_LOGIN: '.btn'
    },
    MESSAGE: '.toast',
    MENU: {
        HOME: ':nth-child(1) > .nav-link > .fas',
        EXTRATO: ':nth-child(3) > .nav-link > .fas',
        SETTINGS: '.dropdown-toggle',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: ':nth-child(2) > .nav-link > .fas'
    },
    CONTAS: {
        NOME: '.form-control',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome => `//table/tbody/tr/td[contains(., '${nome}')]/following-sibling::td//i[@class='far fa-edit']`
    },
    MOVIMENTACAO: {
        DESCRICAO: '#descricao',
        VALOR: '.col-4 > .form-control',
        INTERESSADO: '#envolvido',
        SELECIONADOR_CONTA: ':nth-child(3) > :nth-child(2) > .form-control',
        SALVAR: '.btn-primary',
        TOGGLE_PAGO: '.col-2 > .btn',
        DESPESA: '.btn-secondary'
        
    },
    SALDO: {
        FN_XP_SALDO: nome => `//table/tbody/tr/td[contains(., '${nome}')]/following-sibling::td`
    },
    EXTRATO: {
        FN_XP_EXCLUIR: nome => `//span[contains(., '${nome}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_EDIT: nome => `//span[contains(., '${nome}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_ITEM: nome => `//span[contains(., '${nome}')]/../../../..`
    }
}

export default locators;