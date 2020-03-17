import Head from "next/head";

import "../styles/styles.scss";

import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Pokemon Team Builder</title>
        <meta name="robots" content="noindex" />
        <link rel="stylesheet" href="https://use.typekit.net/ske3nsg.css" />
      </Head>
      <Header />
      {children}
    </>
  );
}
