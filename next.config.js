const withSass = require("@zeit/next-sass");

module.exports = withSass({
  implementation: require("sass"),
  sassOptions: {
    includePaths: [`${__dirname}/styles`]
  }
});
