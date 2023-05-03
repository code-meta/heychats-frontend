import React from "react";
import ButtonBase from "./ButtonBase";
import { ButtonProps } from "#/types";

const ButtonPrimarySmall = ({ text, ...rest }: ButtonProps): JSX.Element => {
  return (
    <ButtonBase
      text={text ? text : "Primary"}
      otherClasses="bg-primary flex items-center justify-center !rounded-full text-primary-content hover:bg-primary-focus h-auto w-auto !py-[2px] !px-[16px]"
      {...rest}
    />
  );
};

export default ButtonPrimarySmall;
