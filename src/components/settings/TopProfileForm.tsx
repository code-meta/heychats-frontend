import React from "react";
import Image from "next/image";
import { IMAGE_URL } from "#/config";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
import { RootState } from "#/store";
import { useHandleProfileUpload } from "#/hooks";

const TopProfileForm = () => {
  const user = useSelector((state: RootState) => state.userInfo);

  const [handleProfilePreview] = useHandleProfileUpload();

  return (
    <div className="mt-[3rem] flex flex-col gap-4">
      <div className="w-[100px] h-[100px] flex items-center justify-center border-[3px] border-primary rounded-full relative">
        {user.profile && (
          <Image
            src={`${IMAGE_URL}${user.profile}`}
            alt="profile"
            width={100}
            height={100}
            quality={100}
            className="rounded-full w-full h-full object-cover p-1"
          />
        )}

        {!user.profile && (
          <div className="rounded-full w-full h-full p-1 bg-base-content flex items-center justify-center">
            <h4 className="uppercase font-bold text-5xl text-base-100 select-none">
              {user.username?.slice(0, 2)}
            </h4>
          </div>
        )}

        <div>
          <input
            type="file"
            id="profile"
            accept="image/*"
            hidden
            name="profile"
            onChange={handleProfilePreview}
          />
          <label htmlFor="profile">
            <CameraAltIcon
              className="text-secondary-content bg-secondary rounded-full w-[48px] h-[48px] p-[4px] absolute right-0 bottom-0 hover:bg-secondary-focus cursor-pointer"
              fontSize="large"
            />
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-base-content text-xl font-semibold ml-2">
          {user.username}
        </h4>
      </div>
    </div>
  );
};

export default TopProfileForm;
