import {
  BrandMessage,
  ChatBoard,
  ChatCard,
  ChatForm,
  NoChats,
  PrimaryHeader,
} from "#/components";
import { withAuth } from "#/services";
import { RootState } from "#/store";
import { IMessage } from "#/types";
import Head from "next/head";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetChats,
  useHandleChatRoom,
  useScrollToBottom,
  useWsListeners,
  useHandleSendMessage,
  useHandleImageSend,
} from "#/hooks";

const Dashboard = () => {
  // states
  const chats = useSelector((state: RootState) => state.chats.chats);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [wsImage, setWsImage] = useState<WebSocket | null>(null);
  const [room_id, setRoomId] = useState<string | null>(null);
  const [OPEN, setOPEN] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newRoomId, setNewRoomId] = useState<number | null>(null);

  // hooks
  const chatBox = useRef<HTMLDivElement>(null);

  const [noChats] = useGetChats();

  useWsListeners({ ws, wsImage, setMessages });

  useScrollToBottom({ element: chatBox, messages });

  const [handleChatRoom] = useHandleChatRoom({
    ws,
    setWs,
    wsImage,
    setWsImage,
    setMessages,
    setOPEN,
    setRoomId,
    setNewRoomId,
  });

  const [handleSendMessage] = useHandleSendMessage({
    ws,
    setWs,
    textMessage,
    setTextMessage,
    room_id,
  });

  const [handleImageSend] = useHandleImageSend({
    wsImage,
    setWsImage,
    room_id,
  });

  if (noChats) return <NoChats />;

  return (
    <>
      <Head>
        <title>Chats</title>
      </Head>

      <PrimaryHeader />

      <main className="text-base-content flex">
        {chats.length !== 0 && (
          <>
            <div
              className="w-[300px] border-r border-neutral"
              style={{ minHeight: "calc(100vh - 80px)" }}
            >
              <div className="flex flex-col gap-2 mt-[2rem]">
                {chats.map((connection) => (
                  <ChatCard
                    {...connection}
                    key={connection.room_id}
                    handler={handleChatRoom}
                    activeRoom={room_id}
                  />
                ))}
              </div>
            </div>

            {!OPEN && <BrandMessage />}

            {OPEN && (
              <div
                className="flex-1 relative chat_room"
                style={{ height: "calc(100vh - 80px)" }}
              >
                <ChatBoard chatBox={chatBox} messages={messages} />

                <ChatForm
                  handleSendMessage={handleSendMessage}
                  textMessage={textMessage}
                  setTextMessage={setTextMessage}
                  handleImageSend={handleImageSend}
                  newRoomId={newRoomId}
                />
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default withAuth(Dashboard);
