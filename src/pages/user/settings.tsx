import React, { useState } from "react";
import {
  Account,
  DeleteAccountModal,
  EditProfileForm,
  PrimaryHeader,
  TopProfileForm,
} from "#/components";
import { withAuth } from "#/services";
import Head from "next/head";
import { useHandleDeleteUserActions } from "#/hooks";

const settings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [handleOpenModal, handleCloseModal, handleDeleteAccount] =
    useHandleDeleteUserActions({ setIsOpen });

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      <main className="relative">
        <PrimaryHeader />

        <div className="max-w-[1200px] w-full mx-auto px-4">
          <TopProfileForm />

          <EditProfileForm />

          {isOpen && (
            <DeleteAccountModal
              handleCloseModal={handleCloseModal}
              handleDeleteAccount={handleDeleteAccount}
            />
          )}

          <Account handleOpenModal={handleOpenModal} />
        </div>
      </main>
    </>
  );
};

export default withAuth(settings);
