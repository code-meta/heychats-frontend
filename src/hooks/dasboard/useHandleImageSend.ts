import { WS_URL } from "#/config";
import { CHUNK_SIZE } from "#/constants";
import { RootState } from "#/store";
import { useSelector } from "react-redux";

interface ITypes {
  wsImage: WebSocket | null;
  setWsImage: Function;
  room_id: string | null;
}

const useHandleImageSend = ({ wsImage, setWsImage, room_id }: ITypes) => {
  const user = useSelector((state: RootState) => state.userInfo);

  const handleImageSend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fiels: FileList | null = e.target.files;

    if (fiels) {
      for (let i = 0; i < fiels.length; i++) {
        const reader: FileReader = new FileReader();

        reader.readAsDataURL(fiels[i]);

        let image_name = fiels[i].name;

        reader.onload = function (e) {
          const result = e.target?.result;
          if (typeof result === "string") {
            const base64 = result.split(",")[1];
            const chunks = base64.match(new RegExp(`.{1,${CHUNK_SIZE}}`, "g"));

            if (chunks && wsImage && wsImage.readyState === 1) {
              for (let i = 0; i < chunks.length; i++) {
                wsImage.send(
                  JSON.stringify({
                    image_file_name: image_name,
                    image_chunk: chunks[i],
                    image_chunk_current_index: i,
                    image_chunk_length: chunks.length,
                  })
                );
              }
            }

            if (chunks && (!wsImage || wsImage.readyState !== 1)) {
              const socket = new WebSocket(
                `${WS_URL}/chat-image-receiver/${user.id}/${room_id}/`
              );
              setWsImage(socket);
              socket.addEventListener("open", (e) => {
                if (socket.readyState === 1) {
                  for (let i = 0; i < chunks.length; i++) {
                    socket.send(
                      JSON.stringify({
                        image_file_name: image_name,
                        image_chunk: chunks[i],
                        image_chunk_current_index: i,
                        image_chunk_length: chunks.length,
                      })
                    );
                  }
                }
              });
            }
          }
        };
      }
    }
  };

  return [handleImageSend];
};

export default useHandleImageSend;
