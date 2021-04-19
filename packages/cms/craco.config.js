const dotenvCra = require("dotenv-cra");
const { whenProd } = require("@craco/craco");
const cspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
// const purgecss = require("@fullhuman/postcss-purgecss");

dotenvCra.config();

const apiParts = process.env.REACT_APP_API_ENDPOINT.split("/");
const apiEndpoint = `${apiParts[0]}//${apiParts[2]}`;
const uploadParts = process.env.REACT_APP_UPLOAD_ENDPOINT.split("/");
const uploadEndpoint = `${uploadParts[0]}//${uploadParts[2]}`;
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
    "www.googletagmanager.com",
    "https://ssl.gstatic.com",
    "https://www.gstatic.com",
    "https://live.staticflickr.com",
    uploadEndpoint,
  ],
  "font-src": ["'self'"],
  "form-action": "'none'",
  "manifest-src": ["'self'"],
  "connect-src": [
    "'self'",
    "data:",
    apiEndpoint,
    uploadEndpoint,
    cognitoEndpoint,
    `https://${process.env.REACT_APP_AUTH_OAUTH_DOMAIN}`,
    "https://www.google-analytics.com",
    "s3.amazonaws.com",
  ],
};

module.exports = {
  // style: {
  //   postcss: {
  //     plugins: [
  //       ...whenProd(
  //         () => [
  //           purgecss({
  //             content: ["./src/**/*.js"],
  //             safelist: [
  //               /(^|\.)fa-/,
  //               /-fa($|\.)/,
  //               /^body$/,
  //               /navbar*/,
  //               /card*/,
  //               /modal*/,
  //               /bg-dark/,
  //             ],
  //           }),
  //         ],
  //         []
  //       ),
  //     ],
  //   },
  // },
  webpack: {
    plugins: [
      ...whenProd(() => [new cspHtmlWebpackPlugin(cspConfigPolicy)], []),
    ],
  },
};
