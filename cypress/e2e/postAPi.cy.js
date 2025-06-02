/// <reference types="cypress"/>

describe ('Cadastro de dispositivos', () => {

    it('Cadastro de um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 16)

        const body = {
            "name": "Iphone 29",
            "data": {
                "year": 2025,
                "price": 9500,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "owner": "Ramos LTDA"
            }
        }

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body
        }).as('postDeviceResult')

        // Validações
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(200)
            expect(response.body.id).not.empty
            expect(response.body.createdAt).not.empty
            expect(response.body.createdAt.slice(0, 16)).equal(dataAtual)
            expect(response.body.name).equal('Iphone 29')
        })
    })

    it('Cadastrar um dispositivo sem mandar dados', () => {

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: ''
        }).as('postDeviceResult')

        // Validações
        cy.get('@postDeviceResult').then((response) => {
            expect(response.status).equal(400)
            expect(response.body.error)
                .equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
        })
    })
})