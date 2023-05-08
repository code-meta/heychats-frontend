import React, { useRef, useState } from "react";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { InputProps } from "#/types";
import { useHandleEmojiInsert, useLoadEmojis, useResetForm } from "#/hooks";

interface CustomInputProps extends InputProps {
  handleImageSend: (e: React.ChangeEvent<HTMLInputElement>) => void;
  textMessage: string;
  setTextMessage: Function;
  newRoomId: number | null;
}

interface IEmoji {
  character: string;
  group: string;
  slug: string;
  subGroup: string;
  unicodeName: string;
}

const TextInputMessage = ({
  labelText,
  inputId,
  handleImageSend,
  textMessage,
  setTextMessage,
  newRoomId,
  ...rest
}: CustomInputProps): JSX.Element => {
  const [emojis, setEmojis] = useState<IEmoji[]>([]);
  const [showEmojis, setShowEmojis] = useState(false);
  const messageInput = useRef<HTMLInputElement | null>(null);
  const [lastCaretPos, setLastCaretPos] = useState<number>(0);

  useLoadEmojis({ setEmojis });

  const [handleEmojiInsert] = useHandleEmojiInsert({
    lastCaretPos,
    messageInput,
    setLastCaretPos,
    setTextMessage,
    textMessage,
  });

  useResetForm({ newRoomId, setShowEmojis, setTextMessage });

  return (
    <div className="flex flex-col gap-2 relative bg-neutral rounded-lg">
      <div className="relative">
        <input
          id={inputId}
          className="h-[40px] rounded-[6px] bg-input-message placeholder:text-input-message-placeholder text-input-message-content outline-0 px-2 border-2 border-input-message-focus w-full pr-[5rem]"
          ref={messageInput}
          {...rest}
        />

        <div className="absolute top-0 right-0 h-full flex items-center justify-center gap-2 pr-2">
          <InsertEmoticonOutlinedIcon
            className="text-primary"
            onClick={() => setShowEmojis(!showEmojis)}
          />
          <label htmlFor="send-images">
            <ImageOutlinedIcon className="text-primary" />
          </label>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        id="send-images"
        hidden
        onChange={handleImageSend}
      />

      {emojis.length > 0 && showEmojis && (
        <div className="h-[100px] overflow-y-auto flex flex-wrap gap-2 max-w-[500px] mt-2 emoji-wrapper px-4 justify-center">
          {emojis.map((item) => (
            <span
              className="select-none cursor-pointer w-[32px] h-[32px] flex items-center justify-center hover:bg-base-200 rounded-sm"
              key={item.unicodeName}
              onClick={(e) => handleEmojiInsert(e, item.character)}
            >
              {item.character}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextInputMessage;
