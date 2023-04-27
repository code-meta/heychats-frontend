import React, { useEffect, useState } from "react";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setToken } from "#/features/tokenSlice";
import { getToken } from "./token";

const withAuth = <P extends object>(WrappedComponent: NextComponentType<P>) => {
  return (props: P) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      const { access, refresh } = getToken();

      if (!access) router.push("/auth/login");

      if (access) {
        dispatch(setToken({ access, refresh }));
        setLoading(false);
      }

      return () => {
        console.log("Unmounted");
      };
    }, []);

    return !loading && <WrappedComponent {...props} />;
  };
};

export default withAuth;
