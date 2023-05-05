import { allMessages } from "#/api";
import { WS_URL } from "#/config";
import { RootState } from "#/store";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

interface ITypes {
  ws: WebSocket | null;
  setWs: Function;
  setWsImage: Function;
  wsImage: WebSocket | null;
  setOPEN: Function;
  setRoomId: Function;
  setMessages: Function;
}

const useHandleChatRoom = ({
  ws,
  setWs,
  wsImage,
  setWsImage,
  setOPEN,
  setRoomId,
  setMessages,
}: ITypes) => {
  const user = useSelector((state: RootState) => state.userInfo);

  const handleChatRoom = async (
    e: React.MouseEvent<HTMLDivElement>,
    room_id: string
  ) => {
    const socket = new WebSocket(`${WS_URL}/chat/${user.id}/${room_id}/`);
    setWs(socket);
    setWsImage(
      new WebSocket(`${WS_URL}/chat-image-receiver/${user.id}/${room_id}/`)
    );
    setOPEN(true);
    setRoomId(room_id);

    if (ws) {
      ws.close();
    }

    if (wsImage) {
      wsImage.close();
    }

    try {
      const res = await allMessages({ room_id });
      setMessages(res.data.data.messages);
    } catch (error) {
      setMessages([]);
      console.log((error as AxiosError).response?.data);
    }
  };

  return [handleChatRoom];
};

export default useHandleChatRoom;
