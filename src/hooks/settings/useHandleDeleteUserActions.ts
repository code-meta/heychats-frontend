import { deleteUserAccount } from "#/api";
import { removeToken } from "#/services/token";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

interface ITypes {
  setIsOpen: Function;
}

const useHandleDeleteUserActions = ({ setIsOpen }: ITypes) => {
  const router = useRouter();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      removeToken();
      router.push("/auth/login");
    } catch (error) {
      console.log((error as AxiosError).message);
    }

    setIsOpen(false);
  };

  return [handleOpenModal, handleCloseModal, handleDeleteAccount];
};

export default useHandleDeleteUserActions;
