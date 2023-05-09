import React from "react";

interface IPropTypes {
  handleCloseModal: () => void;
  handleDeleteAccount: () => void;
}

const DeleteAccountModal = ({
  handleCloseModal,
  handleDeleteAccount,
}: IPropTypes) => {
  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-[#000000c4]">
      <div className="bg-slate-800 p-4 rounded-lg shadow-sm">
        <p className="text-white">Are you sure about deleting your Account?</p>

        <div className="flex gap-x-4 mt-8">
          <div>
            <button
              className="h-[40px] bg-green-700 text-white hover:bg-green-800 px-4 rounded-sm inline-block font-open-sans font-semibold text-base transition-all duration-500"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>

          <div>
            <button
              className="h-[40px] bg-red-700 text-white hover:bg-red-800 px-4 rounded-sm inline-block font-open-sans font-semibold text-base transition-all duration-500"
              onClick={handleDeleteAccount}
            >
              Yes Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
