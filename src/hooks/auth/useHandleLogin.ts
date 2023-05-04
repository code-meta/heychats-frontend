import { loginUser } from "#/api";
import { setToken } from "#/features/tokenSlice";
import { setUser } from "#/features/userInfoSlice";
import { storeToken } from "#/services/token";
import { loginSchema } from "#/validation";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { z } from "zod";

interface ITypes {
  setFormErrors: Function;
}

type FormData = z.infer<typeof loginSchema>;

const useHandleLogin = ({ setFormErrors }: ITypes) => {
  // hooks
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (data: FormData) => {
    try {
      const res = await loginUser(data);
      dispatch(setUser(res.data.data.user));

      storeToken(res.data.data.token);
      dispatch(setToken(res.data.data.token));

      router.push("/");
    } catch (error) {
      const fields_errors = (error as AxiosError).response?.data as {};
      setFormErrors(fields_errors);
    }
  };

  return [handleLogin];
};

export default useHandleLogin;
