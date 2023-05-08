import { useEffect } from "react";

interface IEmoji {
  character: string;
  group: string;
  slug: string;
  subGroup: string;
  unicodeName: string;
}

interface Itypes {
  search: string;
  setSearch: Function;
  setFilteredEmojis: Function;
  emojis: IEmoji[];
}

const useHandleEmojiSearch = ({
  search,
  setSearch,
  setFilteredEmojis,
  emojis,
}: Itypes) => {
  const handleEmojiSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (search.trim() === "") return;

    let data = emojis.filter((item) => {
      return item.unicodeName.search(search.trim()) !== -1;
    });

    setFilteredEmojis(data);

    if (search.trim() === "") setFilteredEmojis([]);
  };

  useEffect(() => {
    if (search.trim() === "") setFilteredEmojis([]);
  }, [search]);

  return [handleEmojiSearch];
};

export default useHandleEmojiSearch;
