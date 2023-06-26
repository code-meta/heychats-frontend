import React, { useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "#/store";
import { IMAGE_URL } from "#/config";
import TopHeaderProfileMenu from "./TopHeaderProfileMenu";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

const TopHeaderProfile = () => {
  const user = useSelector((state: RootState) => state.userInfo);

  const imageLoader = ({ src, width, quality }: ImageLoaderParams): string => {
    return `${IMAGE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="profile_button relative">
      <TopHeaderProfileMenu />
      {user.profile ? (
        <div>
          <Image
            loader={imageLoader}
            src={`${user.profile}`}
            alt="profile-pic"
            width={46}
            height={46}
            className="rounded-full w-[46px] h-[46px] object-cover"
          />
        </div>
      ) : (
        <div className="rounded-full w-[46px] h-[46px] p-1 bg-base-content flex items-center justify-center">
          <h4 className="uppercase font-bold text-lg text-base-100 select-none">
            {user.username?.slice(0, 2)}
          </h4>
        </div>
      )}
    </div>
  );
};

export default TopHeaderProfile;
