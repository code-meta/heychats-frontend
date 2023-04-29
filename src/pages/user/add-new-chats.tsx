import { ButtonPrimary, PrimaryHeader, TextInputSearch } from "#/components";
import { withAuth } from "#/services";
import Head from "next/head";
import React, { useState } from "react";

const AddNewChats = () => {
  const [searchId, setSearchId] = useState("");

  const handleFindConnection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(searchId);
  };

  return (
    <>
      <Head>
        <title>Add new Chats</title>
      </Head>
      <main>
        <PrimaryHeader />

        <form
          className="max-w-[500px] w-[95%] mx-auto mt-[3rem]"
          onSubmit={handleFindConnection}
        >
          <TextInputSearch
            inputId="search"
            placeholder="Enter Your friend’s Connection Id"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </form>
      </main>
    </>
  );
};

export default withAuth(AddNewChats);
