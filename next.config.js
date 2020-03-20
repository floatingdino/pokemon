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
    },
    target: "serverless",
    transformManifest: manifest => ["/"].concat(manifest),
    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: "NetworkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 250,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  })
);
