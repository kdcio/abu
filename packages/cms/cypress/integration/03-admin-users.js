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
    cy.get("#login-title").contains("Login");

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
    cy.get("#hello-title").should("be.visible").contains(`Hello ${firstName}!`);
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

    cy.saveLocalStorage();
  });

  it("Add user editor", () => {
    cy.restoreLocalStorage();
    cy.get(".c-sidebar-nav").within(() => {
      cy.findByText("Users").should("exist").click();
    });

    cy.get("#listTitle").should("be.visible").contains("Users");
    cy.get("#addUser").click();
    cy.get("#addTitle").should("be.visible").contains("Add User");

    // Add editor user
    const eFirstName = faker.name.firstName();
    const eLastName = faker.name.lastName();
    const ePassword = `${faker.internet.password()}1A`;
    const eEmail = faker.internet.email(
      eFirstName,
      eLastName,
      "test.kdc.codes"
    );
    cy.get("#email").should("be.visible").type(eEmail);
    cy.get("#add").click();

    // Find user in list
    cy.get("#listTitle").should("be.visible").contains("Users");
    cy.get("tbody").within(() => {
      cy.findByText(eEmail)
        .should("exist")
        .next()
        .contains("editor")
        .next()
        .contains("FORCE_CHANGE_PASSWORD");
    });

    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`)
      .click();
    cy.get("#logout").click();
    cy.get("#login-title").contains("Login");

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
    cy.get("#hello-title")
      .should("be.visible")
      .contains(`Hello ${eFirstName}!`);
    cy.get("#logout").click();

    // login again as admin
    cy.get("#login-title").contains("Login");
    cy.get("#email").type(email);
    cy.get("#password").type(password, { log: false });
    cy.get("#login").click();
    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`);
    cy.get("#hello-title").should("be.visible").contains(`Hello ${firstName}!`);
    cy.get(".c-sidebar-nav").within(() => {
      cy.findByText("Users").should("exist").click();
    });

    // check if editor data has been update
    cy.get("#listTitle").should("be.visible").contains("Users");
    cy.get("tbody").within(() => {
      cy.findByText(eEmail)
        .should("exist")
        .first()
        .contains(eFirstName)
        .prev()
        .contains(eLastName)
        .next()
        .contains(eEmail)
        .next()
        .contains("editor")
        .next()
        .contains("CONFIRMED")
        .next()
        .within(() => {
          cy.get(".edit-btn").click();
        });
    });

    // Edit user
    cy.get("#formTitle").contains("Edit User");
    cy.get("#email").should("have.value", eEmail);
    cy.get("#firstName").should("have.value", eFirstName);
    cy.get("#lastName").should("have.value", eLastName).type(" jr");
    cy.get("#group").should("have.value", "editor").select("admin");
    cy.get("#save").click();

    // Check if user is updated
    cy.get("#listTitle").should("be.visible").contains("Users");
    cy.get("tbody").within(() => {
      cy.findByText(eEmail)
        .should("exist")
        .first()
        .contains(eFirstName)
        .prev()
        .contains(`${eLastName} jr`)
        .next()
        .contains(eEmail)
        .next()
        .contains("admin")
        .next()
        .contains("CONFIRMED")
        .next()
        .within(() => {
          cy.get(".edit-btn").click();
        });
    });

    // Change password
    const newPassword = `${faker.internet.password()}1A`;
    cy.get("#password").clear().type(newPassword);
    cy.get("#confirmPassword").clear().type(newPassword);
    cy.get("#save").click();

    // Logout as admin
    cy.get("#full-name")
      .should("be.visible")
      .contains(`${firstName} ${lastName}`)
      .click();
    cy.get("#logout").click();

    // Test new password
    cy.get("#email").type(eEmail);
    cy.get("#password").type(newPassword, { log: false });
    cy.get("#login").click();
    cy.get(".c-sidebar-brand-full").click();
    cy.get("#hello-title")
      .should("be.visible")
      .contains(`Hello ${eFirstName}!`);
    cy.get("#full-name")
      .should("be.visible")
      .contains(`${eFirstName} ${eLastName}`)
      .click();
    cy.get("#logout").click();

    // login again as admin and delete editor
    cy.get("#login-title").contains("Login");
    cy.get("#email").type(email);
    cy.get("#password").type(password, { log: false });
    cy.get("#login").click();
    cy.get("#hello-title").should("be.visible").contains(`Hello ${firstName}!`);
    cy.get(".c-sidebar-nav").within(() => {
      cy.findByText("Users").should("exist").click();
    });

    // Delete user
    cy.on("window:confirm", () => true);
    cy.get("tbody").within(() => {
      cy.findByText(eEmail)
        .should("exist")
        .first()
        .contains(eFirstName)
        .prev()
        .contains(`${eLastName} jr`)
        .next()
        .contains(eEmail)
        .next()
        .contains("admin")
        .next()
        .contains("CONFIRMED")
        .next()
        .within(() => {
          cy.get(".delete-btn").click();
        });
    });
    cy.get("tbody").within(() => {
      cy.findByText(eEmail).should("not.exist");
    });
  });

  after(function () {
    cy.log(`Deleting user ${email}`);
    cy.deleteCognitoUser(email);
  });
});
