import { ButtonPrimary } from "#/components";
import { withAuth } from "#/services";
import { removeToken } from "#/services/token";
import { RootState } from "#/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.token);

  useEffect(() => {
    console.log("hi");
    console.log(token.access);
    console.log(token.refresh);
  }, [token]);

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
