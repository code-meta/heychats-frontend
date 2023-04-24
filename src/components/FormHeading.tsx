import React from "react";

interface IpropTypes {
  heading: string;
}

const FormHeading = ({ heading }: IpropTypes) => {
  return (
    <h2 className="text-base-content font-lato font-bold text-4xl select-none">
      {heading}
    </h2>
  );
};

export default FormHeading;
