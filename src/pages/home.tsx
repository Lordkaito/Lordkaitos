import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect } from "react";

const Home = () => {
  const token = Cookies.get("sessionToken") || "";

  // this function will allow us to control the user login with the token
  useEffect(() => {
  if (token !== "undefined") {
    fetch("/api/users/checkLogIn", {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((res) => {
        if(res.status === 200) {
          Router.push("/home")
        } else {
          Router.push("/auth/login")
        }
      });
  } else {
    Router.push("/auth/login");
  }
}, [token]);
  // ir order to create a logout method and to store session, you will need to use localstorage
  return (
    <>
      <Navbar />
      This is the home screen
      <button>
        <a href="/api/items/newItem">Items</a>
      </button>
    </>
  );
};

//this is the main page for those who has been logged in (user home screen)

export default Home;
