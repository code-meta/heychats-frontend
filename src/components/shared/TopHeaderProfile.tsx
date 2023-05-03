import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "#/store";
import { IMAGE_URL } from "#/config";

const TopHeaderProfile = () => {
  const user = useSelector((state: RootState) => state.userInfo);

  return user.profile ? (
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
    <div className="rounded-full w-[46px] h-[46px] p-1 bg-base-100 flex items-center justify-center">
      <h4 className="uppercase font-bold text-lg text-base-content select-none">
        {user.username?.slice(0, 2)}
      </h4>
    </div>
  );
};

export default TopHeaderProfile;
