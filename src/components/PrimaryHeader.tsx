import React from "react";
import PrimaryLogo from "./PrimaryLogo";
import PrimaryTopNav from "./PrimaryTopNav";
import TopHeaderProfile from "./TopHeaderProfile";

const PrimaryHeader = () => {
  return (
    <div className="flex justify-between px-[1rem] h-[80px] items-center bg-gradient-to-b from-neutral to-transparent">
      <PrimaryLogo />

      <PrimaryTopNav />

      <TopHeaderProfile />
    </div>
  );
};

export default PrimaryHeader;
