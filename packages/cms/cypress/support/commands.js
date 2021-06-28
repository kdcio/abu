import "cypress-wait-until";
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("clearDB", (type) => {
  cy.exec(`yarn workspace infra ddb:clear:dev ${type}`);
});
