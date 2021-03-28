import faker from "faker";

let email = null;
let password = null;
describe("Authentication Page:", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("First signin ask to change password", () => {
    cy.get("h1").contains("Login");

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    password = `${faker.internet.password()}1A`;
    email = faker.internet.email(firstName, lastName, "test.kdc.codes");

    cy.addCognitoUser(email);

    cy.getVerificationCode(email).then((code) => {
      cy.get("#email").type(email);
      cy.get("#password").type(code, { log: false });
      cy.get("#login").click();
    });

    cy.get("#first-name").type(firstName);
    cy.get("#last-name").type(lastName);
    cy.get("#password").type(password, { log: false });
    cy.get("#confirm-password").type(password, { log: false });
    cy.get("#complete").click();
    cy.get("#logout").should("be.visible").contains("Logout");
    cy.get("#logout").click();
  });

  it("Second signin go to main", () => {
    cy.get("h1").contains("Login");
    cy.get("#email").type(email);
    cy.get("#password").type(password, { log: false });
    cy.get("#login").click();
    cy.get("#logout").should("be.visible").contains("Logout");
    cy.get("#logout").click();
  });

  after(function () {
    cy.log(`Deleting user ${email}`);
    cy.deleteCognitoUser(email);
  });
});
