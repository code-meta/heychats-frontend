import { RootState } from "#/store";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

interface IPropTypes {
  id: string;
  sender: string;
  created_at: string;
  message: string;
}

const TextMessageCard = ({ id, sender, created_at, message }: IPropTypes) => {
  const user = useSelector((state: RootState) => state.userInfo);

  return (
    <div
      className={`${user.id === sender ? "self-end" : "self-start"}`}
      key={`${created_at}-${id}`}
    >
      <div>
        <span
          className={`${
            user.id === sender ? "text-right" : "text-left"
          } block text-xs text-card-message-info font-medium`}
        >
          {moment(created_at).format("h:mm A")}
        </span>
      </div>
      <div
        className={`bg-card-message py-[10px] px-[16px] mt-[6px] rounded-[12px] ${
          user.id === sender ? "rounded-tr-none" : "rounded-tl-none"
        }`}
      >
        <p className="text-base text-card-message-content">{message}</p>
      </div>
    </div>
  );
};

export default TextMessageCard;
