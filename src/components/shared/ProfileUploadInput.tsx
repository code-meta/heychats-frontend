import React from "react";
import Image from "next/image";

interface IProptypes {
  profileView: Blob | null;
  setProfileView: Function;
}

const ProfileUploadInput = ({ profileView, setProfileView }: IProptypes) => {
  const handleProfilePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileView(e.target.files[0]);
    }
  };

  return (
    <div>
      <label htmlFor="profile">
        <div className="w-[68px] h-[68px] bg-neutral rounded-full flex items-center justify-center m-auto cursor-pointer">
          <Image
            src={
              profileView
                ? URL.createObjectURL(profileView)
                : "/icons/profile-icon.svg"
            }
            width={40}
            height={40}
            alt="profile-icon"
            className={`${
              profileView && "w-full h-full object-cover rounded-full p-1"
            }`}
          />
        </div>
      </label>
      <input
        type="file"
        id="profile"
        accept="image/*"
        className="hidden"
        onChange={handleProfilePreview}
        name="profile"
      />
    </div>
  );
};

export default ProfileUploadInput;
