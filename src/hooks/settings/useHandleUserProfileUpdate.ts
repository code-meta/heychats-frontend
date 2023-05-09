import { updateUserProfile } from "#/api";
import { setUser } from "#/features/userInfoSlice";
import { RootState } from "#/store";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ITypes {
  setUsername: Function;
  setAbout: Function;
  username: string;
  about: string;
}

const useHandleUserProfileUpdate = ({
  setUsername,
  setAbout,
  username,
  about,
}: ITypes) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    user.username && setUsername(user.username);
    user.about && setAbout(user.about);
  }, [user]);

  const handleUserProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() === "" || username.trim().length < 2) return;

    try {
      await updateUserProfile({ username, about });
      const newData = { ...user };
      newData.username = username;
      newData.about = about;
      dispatch(setUser(newData));
    } catch (error) {
      console.log((error as AxiosError).message);
    }
  };

  return [handleUserProfileUpdate];
};

export default useHandleUserProfileUpdate;
