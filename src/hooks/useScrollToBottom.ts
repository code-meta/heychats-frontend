import { allChats } from "#/api";
import { setChats } from "#/features/chatsSlice";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
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
