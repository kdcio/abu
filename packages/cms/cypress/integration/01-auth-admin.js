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
      cy.get("#password").type(`${code}{enter}`);
    });

    cy.get("#first-name").type("a").clear();
    cy.get("#complete").click();
    cy.get(":nth-child(3) > .invalid-feedback").contains(
      "Please provide first name with at least 2 characters."
    );
    cy.get(":nth-child(4) > .invalid-feedback").contains(
      "Please provide last name with at least 2 characters."
    );
    cy.get(":nth-child(5) > .invalid-feedback").contains(
      "Please enter a new password"
    );
    cy.get(":nth-child(6) > .invalid-feedback").contains(
      "Please confirm the new password"
    );
    cy.get("#first-name").type("a");
    cy.get("#last-name").type("b");
    cy.get("#password").type("test");
    cy.get("#confirm-password").type("test1");
    cy.get("#complete").click();
    cy.get(":nth-child(3) > .invalid-feedback").should("not.exist");
    cy.get(":nth-child(4) > .invalid-feedback").should("not.exist");
    cy.get(":nth-child(5) > .invalid-feedback").contains(
      /^Password must contain/
    );
    cy.get(":nth-child(6) > .invalid-feedback").contains(
      "Passwords does not match"
    );
    cy.get("#first-name").clear().type(firstName);
    cy.get("#last-name").clear().type(lastName);
    cy.get("#password").clear().type(password);
    cy.get("#confirm-password").clear().type(password);
    cy.get("#complete").click();
    cy.get(":nth-child(3) > .invalid-feedback").should("not.exist");
    cy.get(":nth-child(4) > .invalid-feedback").should("not.exist");
    cy.get(":nth-child(5) > .invalid-feedback").should("not.exist");
    cy.get(":nth-child(6) > .invalid-feedback").should("not.exist");

    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`)
      .click();
    cy.get("h1").should("be.visible").contains(`Hello ${firstName}!`);
    cy.get(".c-sidebar-nav").within(() => {
      cy.findByText("Content")
        .should("exist")
        .next()
        .within(() => {
          cy.findByText("Add model").should("exist");
        })
        .next()
        .contains("System")
        .next()
        .within(() => {
          cy.findByText("Models").should("exist");
        })
        .next()
        .within(() => {
          cy.findByText("API Access").should("exist");
        })
        .next()
        .within(() => {
          cy.findByText("Users").should("exist");
        });
    });

    cy.get("#logout").should("be.visible").click();
    cy.get("h1").contains("Login");
  });

  it("Second signin go to main", () => {
    cy.get("h1").contains("Login");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.get("#login").click();

    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`)
      .click();
    cy.get("h1").should("be.visible").contains(`Hello ${firstName}!`);
    cy.get(".c-sidebar-nav").within(() => {
      cy.findByText("Content")
        .should("exist")
        .next()
        .within(() => {
          cy.findByText("Add model").should("exist");
        })
        .next()
        .contains("System")
        .next()
        .within(() => {
          cy.findByText("Models").should("exist");
        })
        .next()
        .within(() => {
          cy.findByText("API Access").should("exist");
        })
        .next()
        .within(() => {
          cy.findByText("Users").should("exist");
        });
    });

    cy.get("#logout").click();
    cy.get("h1").contains("Login");
  });

  after(function () {
    cy.log(`Deleting user ${email}`);
    cy.deleteCognitoUser(email);
  });
});
