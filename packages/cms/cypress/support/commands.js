import "cypress-wait-until";

Cypress.Commands.add("clearDB", (type) => {
  cy.exec(`yarn workspace res ddb:clear:dev ${type}`);
});
