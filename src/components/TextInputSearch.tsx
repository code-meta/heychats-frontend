import React from "react";
import { InputProps } from "../types/index";
import SearchIcon from "@mui/icons-material/Search";

const TextInputSearch = ({
  labelText,
  inputId,
  ...rest
}: InputProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-2 relative">
      <input
        id={inputId}
        className="h-[40px] rounded-[6px] bg-input-search placeholder:text-input-search-placeholder text-input-search-content outline-0 px-2 border-2 border-primary focus:border-primary-focus pl-[42px]"
        {...rest}
      />
      <div className="absolute top-0 h-full flex items-center justify-center w-[40px]">
        <SearchIcon className="text-primary" />
      </div>
    </div>
  );
};

export default TextInputSearch;
