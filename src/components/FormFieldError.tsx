import React from "react";

interface IPropTypes {
  error: string;
}

const FormFieldError = ({ error }: IPropTypes): JSX.Element => {
  return <p className="text-error-content">{error}</p>;
};

export default FormFieldError;
