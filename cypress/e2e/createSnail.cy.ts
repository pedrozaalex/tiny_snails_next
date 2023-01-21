describe('Create Snail', () => {
    beforeEach(() => {
        cy.task('resetDB');
        cy.task('seedDB');
        cy.visit('/');
    });

    it('should create a snail successfully', () => {
        cy.dataCy('snail-form-url').type('https://test.com');
        cy.dataCy('snail-form-alias').type('test');
        cy.dataCy('snail-form-submit').click();

        cy.dataCy('snail-info-card').should('contain', 'test');
    });

    it('should display an error message when the alias is already in use', () => {
        cy.dataCy('snail-form-error').should('not.exist');

        cy.dataCy('snail-form-url').type('https://test.com');
        cy.dataCy('snail-form-alias').type('google');
        cy.dataCy('snail-form-submit').click();

        cy.dataCy('snail-form-error').should('exist');
    });
});
