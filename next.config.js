const path = require("path");

const withSass = require("@zeit/next-sass");

module.exports = withSass({
  implementation: require("sass"),
  sassLoaderOptions: {
    sassOptions: {
      includePaths: [path.resolve("./styles")]
    }
  }
});
