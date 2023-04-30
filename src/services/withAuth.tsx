import React, { useEffect, useRef, useState } from "react";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setToken } from "#/features/tokenSlice";
import { getToken } from "./token";
import { getUserInfo } from "#/api";
import { setUser } from "#/features/userInfoSlice";
import { AxiosError } from "axios";

const withAuth = <P extends object>(WrappedComponent: NextComponentType<P>) => {
  return (props: P) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const dispatch = useDispatch();
    const mounted = useRef(true);

    useEffect(() => {
      if (mounted.current === true) {
        const { access, refresh } = getToken();

        if (!access) router.push("/auth/login");

        if (access) {
          dispatch(setToken({ access, refresh }));

          (async () => {
            try {
              const res = await getUserInfo();
              dispatch(setUser(res.data.data.user));
            } catch (error) {
              console.log((error as AxiosError).response?.data);
            }
          })();

          setLoading(false);
        }

        return () => {
          mounted.current = false;
        };
      }
    }, []);

    return !loading && <WrappedComponent {...props} />;
  };
};

export default withAuth;
