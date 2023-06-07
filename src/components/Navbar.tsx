import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import appStore from "../../stores/appStore";
import { set } from "mobx";

interface NavbarProps {
  isLogged?: boolean;
}

const Navbar = observer((props: NavbarProps) => {
  const token = Cookies.get("sessionToken") || null;
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // useEffect((): void => {

  //   if (token !== null) {
  //     fetch("/api/users/checkLogIn", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         token: token,
  //       }),
  //     }).then((res) => {
  //       if (res.status === 200) {
  //         setIsLoggedIn(true);
  //         // Router.push("/home");
  //       } else {
  //         setIsLoggedIn(false);
  //         // Router.push("/auth/login");
  //       }
  //     });
  //   } else {
  //     // Router.push("/auth/login");
  //     setIsLoggedIn(false);
  //   }
  // }, [token]);
  const hanleLogout = () => {
    appStore.setIsLoggedIn(false);
    Cookies.remove("sessionToken");
    Cookies.remove("email");
    Router.push("/auth/login");
  };
  return (
    <nav className="navbar">
      <div className="links">
        <Link href={"/home"} className="link">Lordkaito's</Link>

        <ul className="nav-ul">
          <li className="link home-link">
            {props.isLogged ? (
              <Link href="/home">Home</Link>
            ) : (
              <Link href="/auth/signup">Sign Up</Link>
            )}
          </li>
          <li className="link login-link">
            {props.isLogged ? (
              <button onClick={hanleLogout}>Logout</button>
            ) : (
              <Link href="/auth/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
