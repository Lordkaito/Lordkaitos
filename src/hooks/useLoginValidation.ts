import { useState } from "react";
import Router from "next/router";

export const useLoginValidation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogIn = async (token: string) => {
    if (token !== "undefined") {
      fetch("/api/users/checkLogIn", {
        method: "POST",
        body: JSON.stringify({
          token: token,
        }),
      }).then((res) => {
        if (res.status === 200) {
          Router.push("/home");
        } else {
          Router.push("/auth/login");
        }
      });
    } else {
      Router.push("/auth/login");
    }
  };
  return {
    isLoggedIn,
    checkLogIn,
  };
};
