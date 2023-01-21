import DEFAULT_CLICKS from '../fixtures/clicks';
import DEFAULT_SNAILS from '../fixtures/snails';

describe('Popular Snails', () => {
    beforeEach(() => {
        cy.task('resetDB');
        cy.task('seedDB');
        cy.visit('/');
    });

    it('should display the most popular snails', () => {
        cy.dataCy('popular-snails-root').should('exist');
    });

    it('should display the most popular snail with their click count', () => {
        const alias = DEFAULT_SNAILS[0].alias;
        const clicks = DEFAULT_CLICKS.filter((click) => click.alias === alias).length;

        cy.dataCy('popular-snails-root').should('contain', alias);
        cy.dataCy('popular-snails-root').should('contain', clicks);
    });
});
