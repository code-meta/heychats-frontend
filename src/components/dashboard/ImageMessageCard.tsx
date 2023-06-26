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

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

const ImageMessageCard = ({ message, chatBox }: IPropTypes) => {
  const user = useSelector((state: RootState) => state.userInfo);

  const handleScroll = () => {
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  };

  const imageLoader = ({ src, width, quality }: ImageLoaderParams): string => {
    return `${IMAGE_URL}/${src}?w=${width}&q=${quality || 75}`;
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
          src={`${message.image}`}
          loader={imageLoader}
          alt="image"
          width={280}
          height={100}
          className="w-[280px] h-auto"
          onLoad={handleScroll}
        />
      </div>
    </div>
  );
};

export default ImageMessageCard;
