import React from "react";

const Divider = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-[1px] bg-base-100 flex-1"></div>
      <span className="text-base-content select-none">or</span>
      <div className="h-[1px] bg-base-100 flex-1"></div>
    </div>
  );
};

export default Divider;
