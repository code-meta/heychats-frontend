import { createConnection } from "#/api";
import { IconnectionData } from "#/types";
import { AxiosError } from "axios";

interface ITypes {
  connection: IconnectionData | null;
  setIsConnected: Function;
}

const useHandleCreateConnection = ({ connection, setIsConnected }: ITypes) => {
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

  return [handleCreateConnection];
};

export default useHandleCreateConnection;
