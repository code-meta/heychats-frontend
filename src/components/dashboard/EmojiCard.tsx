import React from "react";

interface IPropTypes {
  unicodeName: string;
  character: string;
  handleEmojiInsert: (
    e: React.MouseEvent<HTMLSpanElement>,
    emoji: string
  ) => void;
}

const EmojiCard = ({
  unicodeName,
  character,
  handleEmojiInsert,
}: IPropTypes) => {
  return (
    <span
      className="select-none cursor-pointer w-[32px] h-[32px] flex items-center justify-center hover:bg-base-200 rounded-sm"
      key={unicodeName}
      onClick={(e) => handleEmojiInsert(e, character)}
    >
      {character}
    </span>
  );
};

export default EmojiCard;
