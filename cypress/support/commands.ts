/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-namespace */

Cypress.Commands.add('dataCy', (value: string) => {
    cy.get(`[data-cy=${value}]`);
});

declare global {
    namespace Cypress {
        interface Chainable {
            dataCy(value: string): Chainable<Element>;
        }
    }
}

export {};
