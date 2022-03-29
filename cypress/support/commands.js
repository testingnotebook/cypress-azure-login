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
// Cypress.Commands.add('login', (email, password) => { ... })
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
Cypress.Commands.add("authenticateAzure", function (email, password) {
  cy.clearCookies();
  cy.removeLocalStorage("access_token");
  cy.visit("{REPLACE-WITH-YOUR-A-PUBLIC-PAGE-ON-YOUR-TEST-DOMAIN}", {
    onBeforeLoad: (win) => {
      win.sessionStorage.clear();
    },
  });
  const options = {
    username: email,
    password: password,
    loginUrl: "{REPLACE-WITH-YOUR-YOUR-TEST-DOMAIN}",
    postLoginSelector: "{REPLACE-WITH-YOUR-TEST-ACCOUNT-PASSWORD}",
    headless: false,
    logs: false,
    getAllBrowserCookies: true,
  };

  cy.task("AzureSingleSignOn", options, { timeout: 90000 }).then((result) => {
    cy.setLocalStorage("access_token", result.localStorage.access_token);
    cy.setLocalStorage("expires_at", result.localStorage.expires_at);
    cy.saveLocalStorage();
  });
});
