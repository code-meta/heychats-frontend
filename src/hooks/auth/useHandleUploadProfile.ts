import { uploadUserProfile } from "#/api";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

interface ITypes {
  profileView: File | null;
}

const useHandleUploadProfile = ({ profileView }: ITypes) => {
  // hooks
  const router = useRouter();

  const handleUploadProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const profileForm = new FormData();

    try {
      if (profileView) {
        profileForm.append("profile", profileView);
        await uploadUserProfile(profileForm);

        router.push("/");
      }
    } catch (error) {
      console.log((error as AxiosError).response?.data);
    }
  };

  return [handleUploadProfile];
};

export default useHandleUploadProfile;
