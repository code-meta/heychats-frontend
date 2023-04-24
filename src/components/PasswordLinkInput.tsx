import React from "react";
import Link from "next/link";
import { InputProps } from "#/types";

const TextInput: React.FC<InputProps> = ({ labelText, inputId, ...rest }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-base-content font-open-sans font-medium text-base select-none"
        >
          {labelText ? labelText : "label"}
        </label>

        <Link
          href="/forgot-password"
          className="text-primary font-open-sans font-medium text-base select-none"
        >
          Forgot Password?
        </Link>
      </div>
      <input
        id={inputId}
        className="h-[40px] rounded-sm bg-input placeholder:text-input-placeholder text-input-content outline-0 px-2 border border-transparent focus:border-accent"
        {...rest}
      />
    </div>
  );
};

export default TextInput;
