import { uploadUserProfile } from "#/api";
import { setUser } from "#/features/userInfoSlice";
import { RootState } from "#/store";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useHandleProfileUpload = () => {
  const user = useSelector((state: RootState) => state.userInfo);
  const [profileView, setProfileView] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleProfilePreview = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfileView(e.target.files[0]);
    }
  };

  useEffect(() => {
    (async () => {
      const profileForm = new FormData();

      try {
        if (profileView) {
          profileForm.append("profile", profileView);
          const { data } = await uploadUserProfile(profileForm);
          const newProfile = { ...user };
          newProfile.profile = data.data.profile;
          dispatch(setUser({ ...newProfile }));
          setProfileView(null);
        }
      } catch (error) {
        console.log((error as AxiosError).response?.data);
      }
    })();
  }, [profileView]);

  return [handleProfilePreview];
};

export default useHandleProfileUpload;
