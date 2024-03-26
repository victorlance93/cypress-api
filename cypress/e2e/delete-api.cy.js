/// <reference types="cypress"/>

describe('Deletar dispositivos', () => {

    it('Deletar um dispositivo não existente', () => {

        const dataAtual = new Date().toISOString().slice(0, 10)

        cy.request({
            method: 'POST',
            url: '/objects',
            failOnStatusCode: false,
            body: {
                "name": "Apple iPad Air",
                "data": {
                    "year": 2019,
                    "price": 2999.00,
                    "CPU model": "A14",
                    "Hard disk size": "64G"
                }
            }
        }).as('postDeviceResult')

        cy.get('@postDeviceResult')
            .then((response_post) => {
                expect(response_post.status).equal(200)
                cy.request({
                    method: 'DELETE',
                    url: `/objects/${response_post.body.id}`,
                    failOnStatusCode: false
                }).as('deleteDeviceResult')

                cy.get('@deleteDeviceResult').then((response_del) => {
                    expect(response_del.status).equal(200)
                    expect(response_del.body.message).equal(`Object with id = ${response_post.body.id} has been deleted.`)
                })

            })
    })

    it('Deletar um dispositivo', () => {

        const id_notFound = 5555

        cy.request({
            method: 'DELETE',
            url: `/objects/${id_notFound}`,
            failOnStatusCode: false
        }).as('deleteDeviceResult')

        cy.get('@deleteDeviceResult').then((response_del) => {
            expect(response_del.status).equal(404)
            expect(response_del.body.error).equal(`Object with id = ${id_notFound} doesn't exist.`)
        })

    })

    it('Deletar um dispositivo que não pode ser deletado', () => {

        const id_dontDelete = 7

        cy.request({
            method: 'DELETE',
            url: `/objects/${id_dontDelete}`,
            failOnStatusCode: false
        }).as('deleteDeviceResult')

        cy.get('@deleteDeviceResult').then((response_del) => {
            expect(response_del.status).equal(405)
            expect(response_del.body.error).equal(`${id_dontDelete} is a reserved id and the data object of it cannot be deleted. You can create your own new object via POST request and try to send a DELETE request with new generated object id.`)
        })

    })
})