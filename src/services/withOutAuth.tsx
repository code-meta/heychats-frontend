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

      if (access) router.push("/dashboard");

      if (!access) {
        setLoading(false);
      }

      return () => {
        console.log("Unmountedxx");
      };
    }, []);

    return !loading && <WrappedComponent {...props} />;
  };
};

export default withOutAuth;
