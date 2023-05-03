import React from "react";
import Image from "next/image";
import { IMAGE_URL } from "#/config";

interface IPropTypes {
  username: string;
  profile: string | null;
  room_id: string;
  handler: Function;
}

const ChatCard = ({
  profile,
  username,
  room_id,
  handler,
}: IPropTypes): JSX.Element => {
  return (
    <div
      className="py-2 hover:bg-neutral px-[1rem] select-none"
      onClick={(e) => handler(e, room_id)}
    >
      <div className="flex items-center gap-4">
        {profile ? (
          <Image
            src={`${IMAGE_URL}${profile}`}
            alt="profile-pic"
            width={46}
            height={46}
            className="w-[46px] h-[46px] rounded-full object-cover"
          />
        ) : (
          <div className="w-[46px] h-[46px] rounded-full bg-base-100 flex items-center justify-center">
            <h4 className="font-bold text-lg uppercase select-none">
              {username.slice(0, 2)}
            </h4>
          </div>
        )}

        <h4 className="text-base-content font-medium text-lg select-none">
          {username}
        </h4>
      </div>
    </div>
  );
};

export default ChatCard;
