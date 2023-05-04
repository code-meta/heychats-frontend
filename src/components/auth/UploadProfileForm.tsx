import { RootState } from "#/store";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import FormHeading from "../shared/FormHeading";
import ProfileUploadInput from "../shared/ProfileUploadInput";
import ButtonPrimary from "../shared/ButtonPrimary";
import ButtonSecondary from "../shared/ButtonSecondary";

interface IPropTypes {
  setProfileView: Function;
  handleUploadProfile: React.FormEventHandler<HTMLFormElement>;
  profileView: File | null;
}

const UploadProfileForm = ({
  handleUploadProfile,
  profileView,
  setProfileView,
}: IPropTypes) => {
  const user = useSelector((state: RootState) => state.userInfo);

  const router = useRouter();

  return (
    <form
      className="sm:max-w-[320px] w-[90%] m-auto sm:ml-[10%] sm:pt-[10%] pt-[5%]"
      onSubmit={handleUploadProfile}
      noValidate
    >
      <FormHeading heading={`Hey ${user.username} upload your profile`} />

      <div className="flex flex-col gap-4 mt-6">
        <ProfileUploadInput
          profileView={profileView}
          setProfileView={setProfileView}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <ButtonPrimary text="Save Profile" type="submit" />
        <ButtonSecondary
          text="Skip for now"
          type="button"
          onClick={() => router.push("/dashboard")}
        />
      </div>
    </form>
  );
};

export default UploadProfileForm;
