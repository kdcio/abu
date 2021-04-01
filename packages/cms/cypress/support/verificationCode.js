const unescape = (html) => {
  let returnText = html;
  returnText = returnText.replace(/&nbsp;/gi, " ");
  returnText = returnText.replace(/&amp;/gi, "&");
  returnText = returnText.replace(/&quot;/gi, `"`);
  returnText = returnText.replace(/&lt;/gi, "<");
  returnText = returnText.replace(/&gt;/gi, ">");
  return returnText;
};

const getVerificationCode = (email) => {
  const url = Cypress.env("mailUrl");
  const apiKey = Cypress.env("mailApiKey");
  try {
    return cy
      .request({
        method: "GET",
        url: `${url}/message?email=${email}`,
        headers: { Authorization: apiKey },
        failOnStatusCode: false,
      })
      .then((response) => {
        // console.log(response.status);
        if (response.status !== 200) return false;

        const emailObj = JSON.parse(response.body);
        const { html } = emailObj;
        console.log(unescape(html));
        const matcher = /temporary password is (.{6})/gm;
        const match = matcher.exec(unescape(html));
        return match[1];
      });
  } catch (error) {
    return false;
  }
};

Cypress.Commands.add("getVerificationCode", (email) => {
  const waitUntilOptions = {
    timeout: 25000,
    interval: 1000,
    customMessage: "wait until an email is received",
    errorMsg: "email did not occur within time limit",
    verbose: true,
    customCheckMessage: "periodically  checking if email got received",
  };

  // waitUntil expects a boolean result, if the email we need exists, we return true
  return cy.waitUntil(() => getVerificationCode(email), waitUntilOptions);
});
