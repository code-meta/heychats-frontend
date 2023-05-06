import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "#/store";
import { removeToken } from "#/services/token";
import { useRouter } from "next/router";

const TopHeaderProfileMenu = () => {
  const user = useSelector((state: RootState) => state.userInfo);
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push("/auth/login");
  };

  return (
    <div className="absolute w-[200px] bg-slate-800 right-0 top-0 rounded-lg rounded-tr-none z-50 hidden profile_menu">
      <div className="border-b pb-2 p-2 border-slate-700">
        <p className="text-base-content text-base">Your Connection ID:</p>
        <p className="text-sm text-accent">{user.connection_id}</p>
      </div>
      <div
        className="p-2 hover:bg-slate-700 cursor-pointer rounded-b-lg py-3"
        onClick={handleLogout}
      >
        <p className="text-base-content text-base select-none">Logout</p>
      </div>
    </div>
  );
};

export default TopHeaderProfileMenu;
