import React, { useRef, useState } from "react";
import TextInputMessage from "./TextInputMessage";
import {
  useHandleEmojiInsert,
  useHandleEmojiSearch,
  useLoadEmojis,
  useResetForm,
} from "#/hooks";
import EmojiCard from "./EmojiCard";

interface IPropTypes {
  textMessage: string;
  handleSendMessage: React.FormEventHandler<HTMLFormElement>;
  setTextMessage: Function;
  handleImageSend: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newRoomId: number | null;
}

interface IEmoji {
  character: string;
  group: string;
  slug: string;
  subGroup: string;
  unicodeName: string;
}

const ChatForm = ({
  handleSendMessage,
  textMessage,
  setTextMessage,
  handleImageSend,
  newRoomId,
}: IPropTypes) => {
  const [emojis, setEmojis] = useState<IEmoji[]>([]);
  const [filteredEmojis, setFilteredEmojis] = useState<IEmoji[]>([]);
  const [showEmojis, setShowEmojis] = useState(true);
  const messageInput = useRef<HTMLInputElement | null>(null);
  const [lastCaretPos, setLastCaretPos] = useState<number>(0);
  const [search, setSearch] = useState("");

  useLoadEmojis({ setEmojis });

  useResetForm({
    newRoomId,
    setShowEmojis,
    setTextMessage,
    setFilteredEmojis,
    setSearch,
  });

  const [handleEmojiInsert] = useHandleEmojiInsert({
    lastCaretPos,
    messageInput,
    setLastCaretPos,
    setTextMessage,
    textMessage,
  });

  const [handleEmojiSearch] = useHandleEmojiSearch({
    search,
    setSearch,
    setFilteredEmojis,
    emojis,
  });

  const handleEmojiToggle = () => {
    setShowEmojis(!showEmojis);
    setSearch("");
  };

  return (
    <div className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-neutral py-4 flex items-center justify-center">
      <div className="min-w-[500px] bg-neutral">
        <form
          onSubmit={handleSendMessage}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        >
          <TextInputMessage
            inputId="message"
            placeholder="Message..."
            value={textMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTextMessage(e.target.value)
            }
            autoFocus
            handleImageSend={handleImageSend}
            messageInput={messageInput}
            handleEmojiToggle={handleEmojiToggle}
          />
        </form>

        {emojis.length > 0 && showEmojis && (
          <div className="h-[100px] overflow-y-auto max-w-[500px] mt-2 emoji-wrapper px-4">
            <input
              placeholder="Search emojis..."
              onChange={handleEmojiSearch}
              value={search}
              required={false}
              className="h-[40px] bg-input-message placeholder:text-input-message-placeholder text-input-message-content outline-0 px-2 border-b-2 border-input-message-focus w-full mb-2"
            />

            <div className="flex flex-wrap gap-2 justify-center">
              {filteredEmojis.map((item) => (
                <EmojiCard
                  key={item.unicodeName}
                  handleEmojiInsert={handleEmojiInsert}
                  character={item.character}
                  unicodeName={item.unicodeName}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {emojis.map((item) => (
                <EmojiCard
                  key={item.unicodeName}
                  handleEmojiInsert={handleEmojiInsert}
                  character={item.character}
                  unicodeName={item.unicodeName}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatForm;
