/// <reference types="cypress"/>

describe('Alterar dispositivos', () => {

    it('Alterar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 10)

        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            failOnStatusCode: false,
            body: {
                "name": "Smartwatch Samsung Galaxy Watch6",
                "data": {
                    "year": 2022,
                    "price": 1709.10,
                    "CPU model": "Android 11",
                    "Hard disk size": "128G"
                }
            }
        }).as('postDeviceResult')

        cy.get('@postDeviceResult')
            .then((response_post) => {
                expect(response_post.status).equal(200)
                expect(response_put.body.name).equal('Smartwatch Samsung Galaxy Watch6')
                cy.request({
                    method: 'PUT',
                    url: `https://api.restful-api.dev/objects/${response_post.body.id}`,
                    failOnStatusCode: false,
                    body: {
                        "name": "Smartwatch Samsung Galaxy Watch6",
                        "data": {
                            "year": 2024,
                            "price": 1909.10,
                            "CPU model": "Android 13",
                            "Hard disk size": "256G"
                        }
                    }
                }).as('updateDeviceResult')

                cy.get('@updateDeviceResult').then((response_put) => {
                    expect(response_put.status).equal(200)
                    expect(response_put.body.name).equal('Smartwatch Samsung Galaxy Watch6')
                    expect(response_put.body.data.year).equal(2024)
                    expect(response_put.body.data).not.empty
                    expect(response_put.body.data['CPU model']).equal('Android 13')
                    expect(response_put.body.data['Hard disk size']).equal('256G')
                })

            })
    })
})