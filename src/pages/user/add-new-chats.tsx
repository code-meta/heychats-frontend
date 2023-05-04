import {
  ButtonPrimarySmall,
  ButtonSuccessSmall,
  PrimaryHeader,
  TextInputSearch,
} from "#/components";
import { IMAGE_URL } from "#/config";
import { useHandleCreateConnection, useHandleFindConnection } from "#/hooks";
import { withAuth } from "#/services";
import { IconnectionData } from "#/types";
import Head from "next/head";
import Image from "next/image";
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

  const [handleCreateConnection] = useHandleCreateConnection({
    connection,
    setIsConnected,
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
          <div className="flex items-center justify-between max-w-[500px] w-[95%] bg-neutral px-4 py-3 roudned-[6px] mx-auto mt-[3rem]">
            <div className="flex items-center gap-3">
              {connection.profile ? (
                <Image
                  src={`${IMAGE_URL}${connection.profile}`}
                  alt="profile-pic"
                  width={46}
                  height={46}
                  className="rounded-full w-[46px] h-[46px] object-cover"
                />
              ) : (
                <div className="rounded-full w-[46px] h-[46px] p-1 bg-base-100 flex items-center justify-center">
                  <h4 className="uppercase font-open-sans font-bold text-lg text-base-content select-none">
                    {connection.username?.slice(0, 2)}
                  </h4>
                </div>
              )}

              <h4 className="text-base-content font-open-sans font-medium text-lg">
                {connection.username}
              </h4>
            </div>
            <div>
              {!isConnected ? (
                <ButtonPrimarySmall
                  text="Connect"
                  onClick={handleCreateConnection}
                />
              ) : (
                <ButtonSuccessSmall text="Connected" />
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default withAuth(AddNewChats);
