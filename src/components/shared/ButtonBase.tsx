import React from "react";
import { ButtonProps } from "#/types";

const ButtonBase = ({
  text,
  otherClasses,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`h-[40px] bg-neutral text-base-content px-4 rounded-sm inline-block w-full font-open-sans font-semibold text-base hover:bg-neutral-focus transition-all duration-500 ${otherClasses}`}
      {...rest}
    >
      {text ? text : "Default"}
    </button>
  );
};

export default ButtonBase;
