import faker from "faker";

let email = null;
let password = null;
let firstName = null;
let lastName = null;

describe("Authentication Page Editor", function () {
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

    cy.addCognitoUser(email, "editor");

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
    cy.get(":nth-child(1) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Dashboard");
    cy.get(":nth-child(3) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Sample");
    cy.get(":nth-child(5) > .c-sidebar-nav-link").should("not.exist");
    cy.get(":nth-child(6) > .c-sidebar-nav-link").should("not.exist");
    cy.get(":nth-child(7) > .c-sidebar-nav-link").should("not.exist");

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
    cy.get(":nth-child(1) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Dashboard");
    cy.get(":nth-child(3) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Sample");
    cy.get(":nth-child(5) > .c-sidebar-nav-link").should("not.exist");
    cy.get(":nth-child(6) > .c-sidebar-nav-link").should("not.exist");
    cy.get(":nth-child(7) > .c-sidebar-nav-link").should("not.exist");

    cy.get("#logout").click();
    cy.get("h1").contains("Login");
  });

  after(function () {
    cy.log(`Deleting user ${email}`);
    cy.deleteCognitoUser(email);
  });
});