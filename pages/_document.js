import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="noindex" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#333" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/img/icon-192.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          <link rel="stylesheet" href="https://use.typekit.net/ske3nsg.css" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
