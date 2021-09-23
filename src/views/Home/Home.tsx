import React from "react";
import Head from "next/head";

/**
 * Home: The Landing page of the web app
 * @return {JSX.Element} The JSX Code for the Home Page
 */

export default function Home(): JSX.Element {
  return (
    <div className="container" data-testid="component-app">
      <Head>
        <title>Mobile Map</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to Mobile Map</h1>

        <p className="description">Under Construction</p>
      </main>
    </div>
  );
}
