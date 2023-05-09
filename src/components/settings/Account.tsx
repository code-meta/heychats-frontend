import React from "react";

interface IPropTypes {
  handleOpenModal: () => void;
}

const Account = ({ handleOpenModal }: IPropTypes) => {
  return (
    <div className="mt-[3rem] pb-[3rem]">
      <h2 className="text-base-content text-2xl font-bold font-lato">
        Account
      </h2>

      <div className="flex mt-[1.5rem]">
        <button
          className="h-[40px] bg-red-700 text-white hover:bg-red-800 px-4 rounded-sm inline-block font-open-sans font-semibold text-base transition-all duration-500"
          onClick={handleOpenModal}
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Account;
