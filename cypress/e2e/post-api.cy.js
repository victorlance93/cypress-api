/// <reference types="cypress"/>

describe('Cadastro de dispositivos', () => {

    it('Cadastrar um dispositivo', () => {

        const dataAtual = new Date().toISOString().slice(0, 10)

        cy.CriarDevice().as('postDeviceResult')

        cy.get('@postDeviceResult')
            .then((response) => {
                expect(response.status).equal(200)
                expect(response.body.id).not.empty
                expect(response.body.createdAt).not.empty
                expect(response.body.createdAt.slice(0, 10)).equal(dataAtual)
                expect(response.body.name).equal('Apple MacBook Pro 19')
                expect(response.body.data).not.empty
                expect(response.body.data.year).equal(2023)
                expect(response.body.data.price).equal(15899.0)
                expect(response.body.data.price).equal(15899.0)
                expect(response.body.data['CPU model']).equal('M3 MAX')
                expect(response.body.data['Hard disk size']).equal('2 TB')

            })
    })

    it('Cadastrar um dispositivo sem mandar os dados', () => {

        cy.NaoCriarDevice().as('postDeviceResult')

        cy.get('@postDeviceResult')
            .then((response) => {
                expect(response.status).equal(400)
                expect(response.body.error).equal('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')

            })
    })
})