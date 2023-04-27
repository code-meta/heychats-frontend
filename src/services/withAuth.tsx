import React, { useEffect, useState } from "react";
import { NextComponentType } from "next";
import { getToken } from "#/utils";
import { useRouter } from "next/router";

const withAuth = <P extends object>(WrappedComponent: NextComponentType<P>) => {
  return (props: P) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const { access, refresh } = getToken();

      if (!access) router.push("/login");

      if (access) {
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
