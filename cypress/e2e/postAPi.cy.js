/// <reference types="cypress"/>

const payloadCadastroDevice = require('../fixtures/deviceSuccess.json')

describe ('Cadastro de dispositivos', () => {

    it('Cadastro de um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 16)

        cy.cadastrarDevice(payloadCadastroDevice)
        .then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 16)).equal(dataAtual)
            expect(response.body.name).equal('Iphone 29')
        })
    })

    it('Cadastrar um dispositivo sem mandar dados', () => {

        cy.cadastrarDevice('')
        .then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error)
                .equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })
    })
})