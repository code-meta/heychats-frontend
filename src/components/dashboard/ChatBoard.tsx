import { RootState } from "#/store";
import { IMessage } from "#/types";
import React from "react";
import { useSelector } from "react-redux";
import TextMessageCard from "./TextMessageCard";
import ImageMessageCard from "./ImageMessageCard";

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
          {messages.map((item, index) => {
            if (item.type === "text") {
              return (
                <TextMessageCard
                  key={`${item.created_at}-${item.id}`}
                  {...item}
                />
              );
            }
            if (item.type === "image") {
              return (
                <ImageMessageCard
                  key={`${item.created_at}-${item.id}-${index}`}
                  message={item}
                  chatBox={chatBox}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default ChatBoard;
