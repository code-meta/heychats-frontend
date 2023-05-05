import { RootState } from "#/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Image from "next/image";
import { IMAGE_URL } from "#/config";

interface IPropTypes {
  message: {
    id: string;
    sender: string;
    created_at: string;
    image?: string;
  };
  chatBox: React.RefObject<HTMLDivElement>;
}

const ImageMessageCard = ({ message, chatBox }: IPropTypes) => {
  const user = useSelector((state: RootState) => state.userInfo);

  const handleScroll = () => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  };

  return (
    <div
      className={`${user.id === message.sender ? "self-end" : "self-start"}`}
      key={`${message.created_at}-${message.id}`}
    >
      <div>
        <span
          className={`${
            user.id === message.sender ? "text-right" : "text-left"
          } block text-xs text-card-message-info font-medium`}
        >
          {moment(message.created_at).format("h:mm A")}
        </span>
      </div>
      <div
        className={`bg-card-message py-1 px-1 mt-[6px] min-w-[280px] min-h-[100px]`}
      >
        <Image
          src={`${IMAGE_URL}${message.image}`}
          alt="image"
          width={280}
          height={100}
          className="w-auto h-auto"
          onLoad={handleScroll}
        />
      </div>
    </div>
  );
};

export default ImageMessageCard;
