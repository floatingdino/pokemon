import Head from "next/head";

import "../styles/styles.scss";

import Header from "./header";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Pokemon Team Builder</title>
        <meta
          name="description"
          content="Browse and select your party of Generation 1 Pokemon"
        />

        <link rel="prefetch" href="/img/pokeball-loader.gif" />
      </Head>
      <Header />
      {children}
    </>
  );
}
