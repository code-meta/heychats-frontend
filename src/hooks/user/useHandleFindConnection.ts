import { findConnection } from "#/api";
import { AxiosError } from "axios";

interface ITypes {
  searchId: string;
  setConnection: Function;
  setIsConnected: Function;
  setIdError: Function;
}

const useHandleFindConnection = ({
  searchId,
  setConnection,
  setIsConnected,
  setIdError,
}: ITypes) => {
  const handleFindConnection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchId.trim() === "") return;

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

  return [handleFindConnection];
};

export default useHandleFindConnection;
