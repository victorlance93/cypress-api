// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

//GET

Cypress.Commands.add('buscarDeviceEspecifico', () => {
    cy.request({
        method: 'GET',
        url: '/objects/7',
        failOnStatusCode: false
    }).then((response) => { return response })
})

Cypress.Commands.add('buscarListaDevices', () => {
    cy.request({
        method: 'GET',
        url: '/objects/',
        failOnStatusCode: false
    }).then((response) => { return response })
})

Cypress.Commands.add('buscarDevicesInexistente', () => {
    cy.request({
        method: 'GET',
        url: '/objects/5555',
        failOnStatusCode: false
    }).then((response) => { return response })
})


//POST
Cypress.Commands.add('CriarDevice', () => {
    cy.request({
        method: 'POST',
        url: '/objects',
        failOnStatusCode: false,
        body: {
            "name": "Apple MacBook Pro 19",
            "data": {
                "year": 2023,
                "price": 15899.00,
                "CPU model": "M3 MAX",
                "Hard disk size": "2 TB"
            }
        }
    }).then((response) => { return response })
})

Cypress.Commands.add('NaoCriarDevice', () => {
    cy.request({
        method: 'POST',
        url: '/objects',
        failOnStatusCode: false,
        body: ''
    }).then((response) => { return response })
})


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })