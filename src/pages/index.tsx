import { getUserInfo } from "#/api";
import { ButtonPrimary } from "#/components";
import { withAuth } from "#/services";
import { removeToken } from "#/services/token";
import { RootState } from "#/store";
import axios, { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const token = useSelector((state: RootState) => state.token);
  const user = useSelector((state: RootState) => state.userInfo);

  useEffect(() => {
    console.log(user);
    console.log(token);
  }, [user, token]);

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
