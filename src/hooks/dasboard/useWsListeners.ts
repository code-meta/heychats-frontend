import { useEffect } from "react";

interface ITypes {
  ws: WebSocket | null;
  setMessages: Function;
}

const useWsListeners = ({ ws, setMessages }: ITypes) => {
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
  }, [ws]);

  return true;
};

export default useWsListeners;
