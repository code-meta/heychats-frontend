import React from "react";
import { InputProps } from "../types/index";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const TextInputMessage = ({
  labelText,
  inputId,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 relative">
      <input
        id={inputId}
        className="h-[40px] rounded-[6px] bg-input-message placeholder:text-input-message-placeholder text-input-message-content outline-0 px-2 border-2 border-input-message-focus"
        {...rest}
      />
      <div className="absolute top-0 right-0 h-full flex items-center justify-center gap-2 pr-2">
        <InsertEmoticonOutlinedIcon className="text-primary" />
        <ImageOutlinedIcon className="text-primary" />
      </div>
    </div>
  );
};

export default TextInputMessage;
