import { RootState } from "#/store";
import { IMessage } from "#/types";
import React from "react";
import { useSelector } from "react-redux";
import TextMessageCard from "./TextMessageCard";

interface IPropTypes {
  chatBox: React.RefObject<HTMLDivElement>;
  messages: IMessage[];
}

const ChatBoard = ({ chatBox, messages }: IPropTypes) => {
  const user = useSelector((state: RootState) => state.userInfo);

  return (
    <div className="h-[90%] overflow-y-auto chat_room py-[2rem]" ref={chatBox}>
      {messages.length > 0 && (
        <div className="flex flex-col gap-2 px-[3rem]">
          {messages.map((item) => (
            <TextMessageCard key={`${item.created_at}-${item.id}`} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatBoard;
