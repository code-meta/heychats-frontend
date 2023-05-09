import React from "react";
import { Account, EditProfileForm, PrimaryHeader, TopProfileForm } from "#/components";
import { withAuth } from "#/services";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState } from "#/store";
import Image from "next/image";
import { IMAGE_URL } from "#/config";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const settings = () => {
  const user = useSelector((state: RootState) => state.userInfo);

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <main>
        <PrimaryHeader />

        <div className="max-w-[1200px] w-full mx-auto px-4">
          <TopProfileForm />

          <EditProfileForm />

          <Account />
        </div>
      </main>
    </>
  );
};

export default withAuth(settings);
