import { createConnection, findConnection } from "#/api";
import {
  ButtonPrimarySmall,
  ButtonSuccessSmall,
  PrimaryHeader,
  TextInputSearch,
} from "#/components";
import { IMAGE_URL } from "#/config";
import { withAuth } from "#/services";
import { IconnectionData } from "#/types";
import { AxiosError } from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

const AddNewChats = () => {
  const [searchId, setSearchId] = useState("");
  const [idError, setIdError] = useState<string | null>(null);
  const [connection, setConnection] = useState<IconnectionData | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleFindConnection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchId === "") return;

    try {
      const res = await findConnection({ connection_id: searchId });
      setConnection(res.data.data.connection);
      setIsConnected(res.data.data.connected);
      setIdError(null);
    } catch (error) {
      setConnection(null);
      setIsConnected(false);

      const status = (error as AxiosError).response?.status;
      if (status === 404 || status === 422) {
        const errors = (error as AxiosError).response?.data as {
          error: { message: string };
        };

        setIdError(errors.error.message);
      }
    }
  };

  const handleCreateConnection = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      if (connection) {
        const res = await createConnection({ user2_id: connection.id });
        console.log(res.data);
        setIsConnected(true);
      }
    } catch (error) {
      console.log((error as AxiosError).response?.data);
    }
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
