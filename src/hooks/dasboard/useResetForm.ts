import { useEffect } from "react";

interface ITypes {
  setTextMessage: Function;
  newRoomId: number | null;
  setShowEmojis: Function;
}

const useResetForm = ({ setShowEmojis, setTextMessage, newRoomId }: ITypes) => {
  useEffect(() => {
    setShowEmojis(false);
    setTextMessage("");
  }, [newRoomId]);
};

export default useResetForm;
