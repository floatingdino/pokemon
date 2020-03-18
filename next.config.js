const path = require("path");

const withSass = require("@zeit/next-sass");
const withOffline = require("next-offline");

module.exports = withOffline(
  withSass({
    implementation: require("sass"),
    sassLoaderOptions: {
      sassOptions: {
        includePaths: [path.resolve("./styles")]
      }
    },
    env: {
      root: process.env.siteRoot || "http://localhost:3000/"
    }
  })
);
