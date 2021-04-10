import faker from "faker";

let email = null;
let password = null;
let firstName = null;
let lastName = null;

describe("Authentication Page Admin", function () {
  beforeEach(function () {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("First signin ask to change password", () => {
    cy.get("h1").contains("Login");

    firstName = faker.name.firstName();
    lastName = faker.name.lastName();
    password = `${faker.internet.password()}1A`;
    email = faker.internet.email(firstName, lastName, "test.kdc.codes");

    cy.addCognitoUser(email, "admin");

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

    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`)
      .click();
    cy.get("h1").should("be.visible").contains(`Hello ${firstName}!`);
    cy.get(".mr-auto > :nth-child(1) > .c-header-nav-link")
      .should("be.visible")
      .contains("Content");
    cy.get(":nth-child(2) > .c-header-nav-link")
      .should("be.visible")
      .contains("Settings");

    cy.get("#logout").should("be.visible").click();
    cy.get("h1").contains("Login");
  });

  it("Second signin go to main", () => {
    cy.get("h1").contains("Login");
    cy.get("#email").type(email);
    cy.get("#password").type(password, { log: false });
    cy.get("#login").click();

    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`)
      .click();
    cy.get("h1").should("be.visible").contains(`Hello ${firstName}!`);
    cy.get(".mr-auto > :nth-child(1) > .c-header-nav-link")
      .should("be.visible")
      .contains("Content");
    cy.get(":nth-child(2) > .c-header-nav-link")
      .should("be.visible")
      .contains("Settings");

    cy.get("#logout").click();
    cy.get("h1").contains("Login");
  });

  after(function () {
    cy.log(`Deleting user ${email}`);
    cy.deleteCognitoUser(email);
  });
});
