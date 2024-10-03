/// <reference types="cypress" />

it('A external test...', () => {

})

describe('Should group tests...', () => {
    describe('Should group more tests...', () => {
        it.skip('A specific test...', () => {

        })
    })
    describe.skip('Should group even more tests...', () => {
        it('A very specific test...', () => {

        })
    })
    it.only('A internal test...', () => {

    })
})