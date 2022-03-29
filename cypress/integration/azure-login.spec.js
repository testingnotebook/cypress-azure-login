it("should login", () => {
  cy.authenticateAzure(
    "{REPLACE-WITH-YOUR-TEST-ACCOUNT-EMAIL}",
    "{REPLACE-WITH-YOUR-TEST-ACCOUNT-PASSWORD}"
  );
  cy.visit("{REPLACE-WITH-YOUR-TEST-DOMAIN}");
  cy.get("{REPLACE-WITH-SOME-INTERESTING-LOCATOR}").should("be.visible");
});
