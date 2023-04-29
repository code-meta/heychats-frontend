import React from "react";
import { PrimaryHeader } from "#/components";
import { withAuth } from "#/services";
import Head from "next/head";

const settings = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <main>
        <PrimaryHeader />
        <p>settings</p>
      </main>
    </>
  );
};

export default withAuth(settings);
