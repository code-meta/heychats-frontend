import { allChats, getUserInfo } from "#/api";
import { ButtonPrimary, ChatCard, NoChats, PrimaryHeader } from "#/components";
import { IMAGE_URL } from "#/config";
import { setChats } from "#/features/chatsSlice";
import { withAuth } from "#/services";
import { removeToken } from "#/services/token";
import { RootState } from "#/store";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  // states
  const user = useSelector((state: RootState) => state.userInfo);
  const chats = useSelector((state: RootState) => state.chats.chats);

  const [noChats, setNoChats] = useState(false);

  // hooks
  const mounted = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mounted.current) {
      (async () => {
        try {
          const res = await allChats();
          console.log(res.data);
          dispatch(setChats(res.data.data.chats));
          setNoChats(false);
        } catch (error) {
          if ((error as AxiosError).response?.status === 404) {
            setNoChats(true);
          }
        }
      })();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  if (noChats) return <NoChats />;

  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>
      <PrimaryHeader />

      <main className="text-base-content flex">
        {chats.length !== 0 && (
          <>
            <div
              className="w-[300px] px-[1rem] border-r border-neutral"
              style={{ minHeight: "calc(100vh - 80px)" }}
            >
              <div className="flex flex-col gap-2 mt-[2rem]">
                {chats.map((connection) => (
                  <ChatCard {...connection} key={connection.room_id} />
                ))}
              </div>
            </div>

            <div
              className="flex-1 pt-[6%]"
              style={{ minHeight: "calc(100vh - 100px)" }}
            >
              <p className="text-center font-jost font-medium text-lg tracking-wider select-none">
                don’t miss a thing <br />
                stay connected all the time.
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default withAuth(Dashboard);
