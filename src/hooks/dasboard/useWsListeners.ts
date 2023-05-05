import { useEffect } from "react";

interface ITypes {
  ws: WebSocket | null;
  wsImage: WebSocket | null;
  setMessages: Function;
}

const useWsListeners = ({ ws, wsImage, setMessages }: ITypes) => {
  useEffect(() => {
    if (ws) {
      ws.addEventListener("open", (e) => {
        console.log("ws connected..");
      });

      ws.addEventListener("close", (e) => {
        console.log("ws disconnected..");
      });

      ws.addEventListener("message", (e) => {
        const data = JSON.parse(e.data).message_content;
        setMessages((prev: []) => [...prev, data]);
      });
    }

    if (wsImage) {
      wsImage.addEventListener("close", (e) => {
        console.log("ws image disconnected..");
      });

      wsImage.addEventListener("message", (e) => {
        const data = JSON.parse(e.data).message_content;
        setMessages((prev: []) => [...prev, data]);
        console.log("ws image message...");
      });
    }
  }, [ws, wsImage]);

  return true;
};

export default useWsListeners;
