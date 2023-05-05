import React from "react";
import TextInputMessage from "./TextInputMessage";

interface IPropTypes {
  textMessage: string;
  handleSendMessage: React.FormEventHandler<HTMLFormElement>;
  setTextMessage: Function;
  handleImageSend: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatForm = ({
  handleSendMessage,
  textMessage,
  setTextMessage,
  handleImageSend,
}: IPropTypes) => {
  return (
    <div className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-neutral py-4 flex items-center justify-center">
      <div className="min-w-[500px]">
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
          />
        </form>
      </div>
    </div>
  );
};

export default ChatForm;
