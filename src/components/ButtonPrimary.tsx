import React from "react";
import ButtonBase from "./ButtonBase";
import { ButtonProps } from "#/types";

const ButtonPrimary: React.FC<ButtonProps> = ({ text, ...rest }) => {
  return (
    <ButtonBase
      text={text ? text : "Primary"}
      otherClasses="bg-primary text-primary-content hover:bg-primary-focus"
      {...rest}
    />
  );
};

export default ButtonPrimary;
