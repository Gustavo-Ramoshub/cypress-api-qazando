/// <reference types="cypress"/>

describe ('Buscar dispositivos', () => {

    it('Buscar um dispositivo especifico', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.restful-api.dev/objects/7',
            failOnStatusCode: false
        }).as('getDeviceResult')

        // Validações
        cy.get('@getDeviceResult')
            .then((response) => {
                //console.log('STATUS CODE: ', response.status)
                expect(response.status).equal(200)
                expect(response.body.id).equal('7')
            })
    })
})



//  Tentar colocar esse teste no code,
//  sendo (failOnStatusCode: false) no teste
//  e colocando (.as('getDeviceResult') nomeando ele) 
// depois cy.get('@getDeviceResult')
// .then((response) => {
//     console.log(response)
// })