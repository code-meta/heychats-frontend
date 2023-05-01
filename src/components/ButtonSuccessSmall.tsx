import React from "react";
import ButtonBase from "./ButtonBase";
import { ButtonProps } from "#/types";

const ButtonPrimarySmall = ({ text, ...rest }: ButtonProps): JSX.Element => {
  return (
    <ButtonBase
      text={text ? text : "Primary"}
      otherClasses="bg-success flex items-center justify-center !rounded-full text-black hover:bg-success h-auto w-auto !py-[2px] !px-[16px]"
      {...rest}
    />
  );
};

export default ButtonPrimarySmall;
