import { ButtonPrimary } from "#/components";
import { withAuth } from "#/services";
import { removeToken } from "#/utils";
import React from "react";

const Dashboard = () => {
  return (
    <div className="text-base-content">
      <p>Dashboard</p>
      <div className="w-[100px]">
        <ButtonPrimary text="Logout" onClick={() => removeToken()} />
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
