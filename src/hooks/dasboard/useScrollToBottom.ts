import { useEffect } from "react";
import React from "react";
import { IMessage } from "#/types";

interface ITypes {
  element: React.RefObject<HTMLDivElement>;
  messages: IMessage[];
}

const useScrollToBottom = ({ element, messages }: ITypes) => {
  useEffect(() => {
    if (element.current) {
      element.current.scrollTop = element.current.scrollHeight;
    }
  }, [messages]);

  return true;
};

export default useScrollToBottom;
