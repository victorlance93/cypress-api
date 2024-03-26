/// <reference types="cypress"/>

describe('Buscar dispositivos', () => {

    it('Buscar dispositivo especifico', () => {
        cy.buscarDeviceEspecifico().as('getDeviceResult')

        cy.get('@getDeviceResult')
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.id).equal('7')
                expect(response.body.name).equal('Apple MacBook Pro 16')
                expect(response.body.data.year).equal(2019)
                expect(response.body.data).not.empty
                expect(response.body.data['CPU model']).equal('Intel Core i9')
                expect(response.body.data['Hard disk size']).equal('1 TB')
            })
    })
    it('Buscar lista de dispositivos', () => {
        cy.buscarListaDevices().as('getDeviceListResult')

        cy.get('@getDeviceListResult')
            .then((response) => {
                expect(response.status).equal(200)
                // Verificar se a lista de dispositivos não está vazia
                expect(response.body).to.have.property('length').that.is.greaterThan(0);
                // Verificar se o tempo de resposta é aceitável (menor que 5 segundos)
                expect(response.duration).to.be.lessThan(3000);
            })
    })

    it('Buscar um dispositivos inexistente', () => {
        cy.buscarDevicesInexistente().as('getDeviceListResult')

        cy.get('@getDeviceListResult')
            .then((response) => {
                expect(response.status).equal(404)
                expect(response.body.error).equal('Oject with id=5555 was not found.')
            })
    })

})