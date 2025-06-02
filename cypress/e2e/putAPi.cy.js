/// <reference types="cypress"/>

describe ('Alterar dispositivos', () => {

    it('Alterar um dispositivo', () => {

        const body_cadastro = {
            "name": "Iphone 29",
            "data": {
                "year": 2025,
                "price": 9500,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "owner": "Ramos LTDA"
            }
        }

        const body_update = {
            "name": "Iphone XREULTRA MAX",
            "data": {
                "year": 2025,
                "price": 11000,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "owner": "GR Celulares"
            }
        }

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: body_cadastro
        }).as('postDeviceResult')

        // Pegando o result do cadastro para pegar o ID
        cy.get('@postDeviceResult').then((response_post) => {
            expect(response_post.status).equal(200)
            expect(response_post.body.name).equal(body_cadastro.name)

            // Fazer o PUT
            cy.request({
                method: 'PUT',
                url: `/objects/${response_post.body.id}`,
                body: body_update,
                failOnStatusCode: false,
            }).as('putDeviceResult')

            // Validações do PUT
            cy.get('@putDeviceResult').then((response_put) => {
                expect(response_put.status).equal(200)
                expect(response_put.body.name).equal(body_update.name)
            })
        })
    })
})