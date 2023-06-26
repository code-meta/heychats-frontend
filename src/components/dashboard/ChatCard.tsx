import React from "react";
import Image from "next/image";
import { IMAGE_URL } from "#/config";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

interface IPropTypes {
  username: string;
  profile: string | null;
  room_id: string;
  total_messages: number;
  lastMessage: { message: string; type: "text" | "image" };
  activeRoom: string | null;
  handler: Function;
}

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

const ChatCard = ({
  profile,
  username,
  room_id,
  lastMessage,
  activeRoom,
  handler,
}: IPropTypes): JSX.Element => {
  const imageLoader = ({ src, width, quality }: ImageLoaderParams): string => {
    return `${IMAGE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div
      className={`py-2 hover:bg-neutral px-[1rem] select-none ${
        room_id === activeRoom && "bg-neutral"
      }`}
      onClick={(e) => handler(e, room_id)}
    >
      <div className="flex items-center gap-4">
        {profile ? (
          <Image
            loader={imageLoader}
            src={`${profile}`}
            alt="profile-pic"
            width={46}
            height={46}
            className="w-[46px] h-[46px] rounded-full object-cover"
          />
        ) : (
          <div className="w-[46px] h-[46px] rounded-full bg-base-content text-base-100 flex items-center justify-center">
            <h4 className="font-bold text-lg uppercase select-none">
              {username.slice(0, 2)}
            </h4>
          </div>
        )}

        <div>
          <h4 className="text-base-content font-medium text-lg select-none">
            {username}
          </h4>
          {lastMessage.type === "text" && (
            <p className="text-slate-400 text-sm font-medium">
              {lastMessage.message.length > 20
                ? `${lastMessage.message.slice(0, 20)}...`
                : lastMessage.message}
            </p>
          )}

          {lastMessage.type === "image" && (
            <div className="flex items-center gap-1">
              <ImageOutlinedIcon className="text-slate-400" fontSize="small" />
              <span className="text-slate-400 text-sm font-medium">Photo</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
