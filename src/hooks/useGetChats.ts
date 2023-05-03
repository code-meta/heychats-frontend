import { allChats } from "#/api";
import { setChats } from "#/features/chatsSlice";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const useGetChats = () => {
  const [noChats, setNoChats] = useState(false);

  const mounted = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mounted.current) {
      (async () => {
        try {
          const res = await allChats();
          dispatch(setChats(res.data.data.chats));
          setNoChats(false);
        } catch (error) {
          if ((error as AxiosError).response?.status === 404) {
            setNoChats(true);
          }
        }
      })();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  return [noChats];
};

export default useGetChats;
