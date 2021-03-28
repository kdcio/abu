require("dotenv/config");
const { whenProd } = require("@craco/craco");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
const purgecss = require("@fullhuman/postcss-purgecss");

const apiParts = process.env.REACT_APP_API_ENDPOINT.split("/");
const apiEndpoint = `${apiParts[0]}//${apiParts[2]}`;
const cognitoEndpoint = `https://cognito-idp.${process.env.REACT_APP_AUTH_AWS_REGION}.amazonaws.com/`;

const cspConfigPolicy = {
  "default-src": "'none'",
  "base-uri": "'self'",
  "object-src": "'none'",
  "frame-src": "'self'",
  "script-src": [
    "'self'",
    "'nonce-c2598a3c-6a1e-469e-ac4e-ae07596e874c'",
    "https://tagmanager.google.com",
    "https://www.google-analytics.com",
  ],
  "style-src": [
    "'self'",
    "https://tagmanager.google.com",
    "https://fonts.googleapis.com",
  ],
  "img-src": [
    "'self'",
    "data:",
    "https://*.kdc.codes",
    "https://*.googleusercontent.com",
    "https://img.shields.io",
    "www.googletagmanager.com",
    "https://ssl.gstatic.com",
    "https://www.gstatic.com",
  ],
  "font-src": ["'self'"],
  "form-action": "'none'",
  "manifest-src": ["'self'"],
  "connect-src": [
    "'self'",
    "data:",
    apiEndpoint,
    cognitoEndpoint,
    `https://${process.env.REACT_APP_AUTH_OAUTH_DOMAIN}`,
    "https://www.google-analytics.com",
  ],
};

module.exports = {
  style: {
    postcss: {
      plugins: [
        ...whenProd(
          () => [
            purgecss({
              content: ["./src/**/*.js"],
              safelist: [
                /(^|\.)fa-/,
                /-fa($|\.)/,
                /^body$/,
                /navbar*/,
                /card*/,
                /modal*/,
                /bg-dark/,
              ],
            }),
          ],
          []
        ),
      ],
    },
  },
  webpack: {
    plugins: [
      ...whenProd(() => [new cspHtmlWebpackPlugin(cspConfigPolicy)], []),
    ],
  },
};
