/// <reference types="cypress"/>

const body_cadastro = require('../fixtures/deviceSuccess.json')
const body_update = require('../fixtures/updateSuccess.json')

describe ('Alterar dispositivos', () => {

    it('Alterar um dispositivo', () => {

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