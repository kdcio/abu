import faker from "faker";

let email = null;
let password = null;
let firstName = null;
let lastName = null;

describe("Manage Users by Admin", function () {
  before(function () {
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
    cy.get(":nth-child(1) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Dashboard");
    cy.get(":nth-child(3) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Sample");
    cy.get(":nth-child(5) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Content");
    cy.get(":nth-child(6) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Apps");
    cy.get(":nth-child(7) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Users");
    cy.saveLocalStorage();
  });

  it("Add user editor", () => {
    cy.restoreLocalStorage();
    cy.get(":nth-child(7) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Users")
      .click();

    cy.get("#listTitle").should("be.visible").contains("Users");
    cy.get("#addUser").click();
    cy.get("#addTitle").should("be.visible").contains("Add User");

    // editor
    const eFirstName = faker.name.firstName();
    const eLastName = faker.name.lastName();
    const ePassword = `${faker.internet.password()}1A`;
    const eEmail = faker.internet.email(
      eFirstName,
      eLastName,
      "test.kdc.codes"
    );
    cy.get("#email").should("be.visible").type(eEmail);
    cy.get("#addUser").click();
    cy.get("#listTitle").should("be.visible").contains("Users");
    cy.get("tbody > :nth-child(1) > :nth-child(3)").contains(eEmail);

    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`)
      .click();
    cy.get("#logout").click();
    cy.get("h1").contains("Login");

    // login as new editor
    cy.getVerificationCode(eEmail).then((code) => {
      cy.get("#email").type(eEmail);
      cy.get("#password").type(code, { log: false });
      cy.get("#login").click();
    });

    cy.get("#first-name").type(eFirstName);
    cy.get("#last-name").type(eLastName);
    cy.get("#password").type(ePassword, { log: false });
    cy.get("#confirm-password").type(ePassword, { log: false });
    cy.get("#complete").click();
    cy.get("#full-name")
      .should("be.visible")
      .contains(`${eFirstName} ${eLastName}`)
      .click();
    cy.get("#logout").click();

    // login again as admin
    cy.get("h1").contains("Login");
    cy.get("#email").type(email);
    cy.get("#password").type(password, { log: false });
    cy.get("#login").click();
    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`);
    cy.get(":nth-child(7) > .c-sidebar-nav-link")
      .should("be.visible")
      .contains("Users")
      .click();

    // check if editor data has been update
    cy.get("#listTitle").should("be.visible").contains("Users");
    cy.get("tbody > :nth-child(1) > :nth-child(1)").contains(eFirstName);
    cy.get("tbody > :nth-child(1) > :nth-child(2)").contains(eLastName);
    cy.get("tbody > :nth-child(1) > :nth-child(3)").contains(eEmail);
    cy.get("tbody > :nth-child(1) > :nth-child(4)").contains("editor");
    cy.get("tbody > :nth-child(1) > :nth-child(5)").contains("CONFIRMED");

    cy.get("tbody > :nth-child(1) > :nth-child(6) > .edit-btn").click();

    // Edit user
    cy.get("#formTitle").contains("Edit User");
    cy.get("#email").should("have.value", eEmail);
    cy.get("#firstName").should("have.value", eFirstName);
    cy.get("#lastName").should("have.value", eLastName).type(" jr");
    cy.get("#group").should("have.value", "editor").select("admin");
    cy.get("#update").click();

    // Check if user is updated
    cy.get("#listTitle").should("be.visible").contains("Users");
    cy.get("tbody > :nth-child(1) > :nth-child(2)").contains(`${eLastName} jr`);
    cy.get("tbody > :nth-child(1) > :nth-child(4)").contains("admin");

    cy.on("window:confirm", () => true);
    cy.get(":nth-child(1) > :nth-child(6) > .delete-btn").click();
    cy.get("tbody > :nth-child(1) > :nth-child(3)").should(
      "not.contain",
      eEmail
    );

    // cy.deleteCognitoUser(eEmail);
  });

  after(function () {
    cy.log(`Deleting user ${email}`);
    cy.deleteCognitoUser(email);
  });
});
