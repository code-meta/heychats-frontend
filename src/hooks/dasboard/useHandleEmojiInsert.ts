import React, { useEffect } from "react";

interface ITypes {
  lastCaretPos: number;
  textMessage: string;
  setTextMessage: Function;
  messageInput: React.RefObject<HTMLInputElement>;
  setLastCaretPos: Function;
}

const useHandleEmojiInsert = ({
  lastCaretPos,
  textMessage,
  setTextMessage,
  messageInput,
  setLastCaretPos,
}: ITypes) => {
  const handleEmojiInsert = (
    e: React.MouseEvent<HTMLSpanElement>,
    emoji: string
  ) => {
    if (lastCaretPos >= 0) {
      let leftText = textMessage.slice(0, lastCaretPos);
      let rightText = textMessage.slice(lastCaretPos);

      if (rightText.length === 0 || rightText.length === 2) {
        leftText = textMessage.slice(0, lastCaretPos + 2);
        rightText = textMessage.slice(lastCaretPos + 2);
      }

      const emojiChar = ` ${emoji} `.trim();
      const msg = `${leftText}${emojiChar}${rightText}`;
      setTextMessage(msg);

      if (messageInput.current) {
        const element = messageInput.current;

        let leftLength = leftText.length + emojiChar.length;

        if (rightText.length === 0 || rightText.length === 2) {
          leftLength = leftText.length + 2 + emojiChar.length;
          element.setSelectionRange(leftLength, leftLength, "forward");
        } else {
          element.setSelectionRange(leftLength, leftLength, "forward");
        }

        element.selectionEnd && setLastCaretPos(element.selectionEnd);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("selectionchange", (e) => {
      if (messageInput.current) {
        const element = messageInput.current;
        element.selectionStart && setLastCaretPos(element.selectionStart);
      }
    });
  }, []);

  return [handleEmojiInsert];
};

export default useHandleEmojiInsert;
