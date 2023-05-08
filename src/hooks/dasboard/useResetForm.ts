import { useEffect } from "react";

interface ITypes {
  setTextMessage: Function;
  newRoomId: number | null;
  setShowEmojis: Function;
  setSearch: Function;
  setFilteredEmojis: Function;
}

const useResetForm = ({
  setShowEmojis,
  setTextMessage,
  newRoomId,
  setFilteredEmojis,
  setSearch,
}: ITypes) => {
  useEffect(() => {
    setShowEmojis(false);
    setTextMessage("");
    setSearch("");
    setFilteredEmojis([]);
  }, [newRoomId]);
};

export default useResetForm;
