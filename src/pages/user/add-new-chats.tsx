import { ConnectionCard, PrimaryHeader, TextInputSearch } from "#/components";
import { useHandleFindConnection } from "#/hooks";
import { withAuth } from "#/services";
import { IconnectionData } from "#/types";
import Head from "next/head";
import React, { useState } from "react";

const AddNewChats = () => {
  const [searchId, setSearchId] = useState("");
  const [idError, setIdError] = useState<string | null>(null);
  const [connection, setConnection] = useState<IconnectionData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [handleFindConnection] = useHandleFindConnection({
    searchId,
    setConnection,
    setIsConnected,
    setIdError,
  });

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
          autoComplete="off"
        >
          <TextInputSearch
            inputId="search"
            placeholder="Enter Your friend’s Connection Id"
            value={searchId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchId(e.target.value)
            }
          />
        </form>

        {idError && (
          <p className="text-error-content text-center mt-[3rem]">{idError}</p>
        )}

        {connection && (
          <ConnectionCard
            connection={connection}
            isConnected={isConnected}
            setIsConnected={setIsConnected}
          />
        )}
      </main>
    </>
  );
};

export default withAuth(AddNewChats);
