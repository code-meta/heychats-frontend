import { allMessages } from "#/api";
import { WS_URL } from "#/config";
import { RootState } from "#/store";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

interface ITypes {
  ws: WebSocket | null;
  setWs: Function;
  textMessage: String;
  setTextMessage: Function;
  room_id: string | null;
}

const useHandleSendMessage = ({
  ws,
  setWs,
  textMessage,
  setTextMessage,
  room_id,
}: ITypes) => {
  const user = useSelector((state: RootState) => state.userInfo);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textMessage.trim() === "") return;

    if (ws && ws.readyState === 1) {
      ws.send(JSON.stringify({ message: textMessage }));
      setTextMessage("");
    }

    if (!ws || ws.readyState !== 1) {
      const socket = new WebSocket(`${WS_URL}/chat/${user.id}/${room_id}/`);
      setWs(socket);

      socket.addEventListener("open", (e) => {
        if (socket.readyState === 1) {
          socket.send(JSON.stringify({ message: textMessage }));
          setTextMessage("");
        }
      });
    }
  };

  return [handleSendMessage];
};

export default useHandleSendMessage;
