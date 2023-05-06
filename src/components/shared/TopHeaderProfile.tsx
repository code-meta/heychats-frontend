import React, { useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "#/store";
import { IMAGE_URL } from "#/config";
import TopHeaderProfileMenu from "./TopHeaderProfileMenu";

const TopHeaderProfile = () => {
  const user = useSelector((state: RootState) => state.userInfo);

  return (
    <div className="profile_button relative">
      <TopHeaderProfileMenu />
      {user.profile ? (
        <div>
          <Image
            src={`${IMAGE_URL}${user.profile}`}
            alt="profile-pic"
            width={46}
            height={46}
            className="rounded-full w-[46px] h-[46px]"
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
