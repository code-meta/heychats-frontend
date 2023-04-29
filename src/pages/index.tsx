import { getUserInfo } from "#/api";
import { ButtonPrimary, PrimaryHeader } from "#/components";
import { withAuth } from "#/services";
import { removeToken } from "#/services/token";
import { RootState } from "#/store";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.token);
  const user = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    console.log(user);
    console.log(token);
  }, [user, token]);

  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>
      <main className="text-base-content">
        <PrimaryHeader />
        <p>Dashboard</p>
        <div className="w-[100px]">
          <ButtonPrimary text="Logout" onClick={() => removeToken()} />
        </div>
      </main>
    </>
  );
};

export default withAuth(Dashboard);
