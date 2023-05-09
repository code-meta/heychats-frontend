import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMAGE_URL } from "#/config";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
import { RootState } from "#/store";
import ButtonPrimary from "../shared/ButtonPrimary";

const EditProfileForm = () => {
  const user = useSelector((state: RootState) => state.userInfo);

  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    user.username && setUsername(user.username);
  }, [user]);

  return (
    <div className="mt-[3rem]">
      <h2 className="text-base-content text-2xl font-bold font-lato">
        Edit Profile
      </h2>

      <form className="md:max-w-[300px] w-full mt-[1.5rem] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-base-content font-medium text-base"
          >
            Username
          </label>
          <input
            id="username"
            placeholder="Username"
            className="h-[40px] bg-input-message placeholder:text-input-message-placeholder text-input-message-content outline-0 px-2 border-b-2 border-input-message-focus w-full mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="about"
            className="text-base-content font-medium text-base"
          >
            About
          </label>
          <textarea
            id="about"
            placeholder="write something about yourself in short."
            className="min-h-[80px] resize-none bg-input-message placeholder:text-input-message-placeholder text-input-message-content outline-0 px-2 border-b-2 border-input-message-focus w-full mb-2"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>

        <div className="w-24">
          <ButtonPrimary text="Save" />
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
