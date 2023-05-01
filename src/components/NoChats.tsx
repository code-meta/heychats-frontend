import Head from "next/head";
import React from "react";
import PrimaryHeader from "./PrimaryHeader";

const NoChats = () => {
  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>
      <PrimaryHeader />
      <div className="mt-[8%]">
        <p className="text-base-content text-center">
          Seems you don’t have any connections yet.
        </p>
      </div>
    </>
  );
};

export default NoChats;
