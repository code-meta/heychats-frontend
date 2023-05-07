import axios from "axios";
import { useEffect, useRef } from "react";

interface ITypes {
  setEmojis: Function;
}

const useLoadEmojis = ({ setEmojis }: ITypes) => {
  const mounted = useRef(true);

  useEffect(() => {
    if (mounted.current) {
      (async () => {
        try {
          const { data } = await axios.get("/json/open-emoji.json");
          setEmojis((prev: []) => [...prev, ...data]);
        } catch (error) {
          console.log(error);
        }
      })();
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  return true;
};

export default useLoadEmojis;
