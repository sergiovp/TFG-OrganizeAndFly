import { generateRandomString } from '../utils/utils';

Cypress.Commands.add('typeInInput', (inputName, text) => {
    cy.get(`input[name=${inputName}]`).type(text)
});

/**
 * To check if we are logedIn, we find 'signOut button
 * in which case, the test pass.
 */
Cypress.Commands.add('checkWeAreLogedIn', () => {
    cy.get('button').contains('span', 'SignOut').should('exist');
});

describe('user basic tests', () => {
    before(() => {
        // Go to our app main page.
        cy.visit('http://localhost:3000');

        // Click on SigUp button.
        cy.get('button').contains('span', 'SignUp').click();

    });
    const randomEmail = `${generateRandomString()}@gmail.com`;
    const pass = generateRandomString();

    it('Check the signUp button is disabled if empty inputs', () => {
        // Gets button which is disabled.
        cy.get('button[disabled]')
            // Check the disabled button is sign up one.
            .contains('span', 'Sign Up');
    });

    it('We are able to insert an email', () => {
        cy.typeInInput('email', randomEmail);
    });

    it('We are able to insert a password', () => {
        cy.typeInInput('password', pass);
    });

    it('We are able to insert a confirmed password', () => {
        cy.typeInInput('confirmedPass', pass);
    });

    it('We are able to signUp', () => {
        // Click on SignUp button.
        cy.get('button[type=submit]').click();
        // Check we are logedIn.
        cy.wait(3000);
        cy.checkWeAreLogedIn();
    });

    it('We are able to logOut', () => {
        // Click on logOut button.
        cy.get('button').contains('span', 'SignOut').click();
    });

    it('We are able to logIn', () => {
        // Click on logIn button.
        cy.get('button').contains('span', 'LogIn').click();
        // Fill the inputs.
        cy.typeInInput('email', randomEmail);
        cy.typeInInput('password', pass);
        // Click on logIn button.
        cy.get('button').contains('span', 'LogIn').click();
        // Check we are logedIn.
        cy.wait(3000);
        cy.checkWeAreLogedIn();
    });
});
