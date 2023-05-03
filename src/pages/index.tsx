import { allChats, allMessages, getUserInfo } from "#/api";
import {
  ButtonPrimary,
  ChatCard,
  NoChats,
  PrimaryHeader,
  TextInputMessage,
} from "#/components";
import { IMAGE_URL } from "#/config";
import { setChats } from "#/features/chatsSlice";
import { withAuth } from "#/services";
import { removeToken } from "#/services/token";
import { RootState } from "#/store";
import { IMessage } from "#/types";
import { AxiosError } from "axios";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const Dashboard = () => {
  // states
  const user = useSelector((state: RootState) => state.userInfo);
  const chats = useSelector((state: RootState) => state.chats.chats);

  const [noChats, setNoChats] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [room_id, setRoomId] = useState<string | null>(null);
  const [OPEN, setOPEN] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  // hooks
  const mounted = useRef(true);
  const dispatch = useDispatch();
  const chatBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mounted.current) {
      (async () => {
        try {
          const res = await allChats();
          dispatch(setChats(res.data.data.chats));
          setNoChats(false);
        } catch (error) {
          if ((error as AxiosError).response?.status === 404) {
            setNoChats(true);
          }
        }
      })();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  const handleChatRoom = async (
    e: React.MouseEvent<HTMLDivElement>,
    room_id: string
  ) => {
    const socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${user.id}/${room_id}/`
    );
    setWs(socket);
    setOPEN(true);
    setRoomId(room_id);

    if (ws) {
      ws.close();
    }

    try {
      const res = await allMessages({ room_id });
      setMessages(res.data.data.messages);
    } catch (error) {
      setMessages([]);
      console.log((error as AxiosError).response?.data);
    }
  };

  useEffect(() => {
    if (ws) {
      ws.addEventListener("open", (e) => {
        console.log("ws connected..");
      });

      ws.addEventListener("close", (e) => {
        console.log("ws disconnected..");
      });

      ws.addEventListener("message", (e) => {
        const data = JSON.parse(e.data).message_content;
        setMessages((prev) => [...prev, data]);
      });
    }
  }, [ws]);

  useEffect(() => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (textMessage.trim() === "") return;

    if (ws && ws.readyState === 1) {
      ws.send(JSON.stringify({ message: textMessage }));
      setTextMessage("");
    }

    if (!ws || ws.readyState !== 1) {
      const socket = new WebSocket(
        `ws://127.0.0.1:8000/ws/chat/${user.id}/${room_id}/`
      );
      setWs(socket);

      socket.addEventListener("open", (e) => {
        if (socket.readyState === 1) {
          socket.send(JSON.stringify({ message: textMessage }));
          setTextMessage("");
        }
      });
    }
  };

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
                  />
                ))}
              </div>
            </div>

            {!OPEN && (
              <div
                className="flex-1 pt-[6%]"
                style={{ minHeight: "calc(100vh - 100px)" }}
              >
                <p className="text-center font-jost font-medium text-lg tracking-wider select-none">
                  don’t miss a thing <br />
                  stay connected all the time.
                </p>
              </div>
            )}

            {OPEN && (
              <div
                className="flex-1 relative chat_room"
                style={{ height: "calc(100vh - 80px)" }}
              >
                <div
                  className="h-[90%] overflow-y-auto chat_room py-[2rem]"
                  ref={chatBox}
                >
                  {messages.length > 0 && (
                    <div className="flex flex-col gap-2 px-[3rem]">
                      {messages.map((item) => (
                        <div
                          className={`${
                            user.id === item.sender ? "self-end" : "self-start"
                          }`}
                          key={`${item.created_at}-${item.id}`}
                        >
                          <div>
                            <span
                              className={`${
                                user.id === item.sender
                                  ? "text-right"
                                  : "text-left"
                              } block text-xs text-card-message-info font-medium`}
                            >
                              {moment(item.created_at).format("h:mm A")}
                            </span>
                          </div>
                          <div
                            className={`bg-card-message py-[10px] px-[16px] mt-[6px] rounded-[12px] ${
                              user.id === item.sender
                                ? "rounded-tr-none"
                                : "rounded-tl-none"
                            }`}
                          >
                            <p className="text-base text-card-message-content">
                              {item.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-neutral py-4 flex items-center justify-center">
                  <div className="min-w-[500px]">
                    <form
                      onSubmit={handleSendMessage}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                    >
                      <TextInputMessage
                        inputId="message"
                        placeholder="Message..."
                        value={textMessage}
                        onChange={(e) => setTextMessage(e.target.value)}
                        autoFocus
                      />
                    </form>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default withAuth(Dashboard);
