import "cypress-wait-until";
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("clearDB", (type) => {
  cy.exec(`yarn workspace res ddb:clear:dev ${type}`);
});
