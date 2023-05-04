import { createUser } from "#/api";
import { setToken } from "#/features/tokenSlice";
import { setUser } from "#/features/userInfoSlice";
import { storeToken } from "#/services/token";
import { createAccountSchema } from "#/validation";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { z } from "zod";

interface ITypes {
  setProcessingUser: Function;
  setUploadPofile: Function;
  setFormErrors: Function;
}

type FormData = z.infer<typeof createAccountSchema>;

const useHandleCreateAccount = ({
  setProcessingUser,
  setUploadPofile,
  setFormErrors,
}: ITypes) => {
  const dispatch = useDispatch();

  const handleCreateAccount = async (data: FormData) => {
    setProcessingUser(true);
    try {
      const res = await createUser(data);
      dispatch(setUser(res.data.data.user));

      storeToken(res.data.data.token);
      dispatch(setToken(res.data.data.token));

      setUploadPofile(true);
      setProcessingUser(false);
      setFormErrors({});
    } catch (error) {
      setProcessingUser(false);
      const fields_errors = (error as AxiosError).response?.data as {};
      setFormErrors(fields_errors);
    }
  };

  return [handleCreateAccount];
};

export default useHandleCreateAccount;
