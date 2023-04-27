import React, { useEffect, useState } from "react";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { getToken } from "./token";

const withOutAuth = <P extends object>(
  WrappedComponent: NextComponentType<P>
) => {
  return (props: P) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const { access, refresh } = getToken();

      if (access) router.push("/");

      if (!access) {
        setLoading(false);
      }

      return () => {
        console.log("Unmounted");
      };
    }, []);

    return !loading && <WrappedComponent {...props} />;
  };
};

export default withOutAuth;
