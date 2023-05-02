import Link from "next/link";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import appStore from "../../stores/appStore";

interface NavbarProps {
  isLogged?: boolean;
}

const Navbar = observer((props: NavbarProps) => {
  console.log(appStore.isLoggedIn);
  const token = Cookies.get("sessionToken") || "";
  const hanleLogout = () => {
    appStore.setIsLoggedIn(false);
    Cookies.remove("sessionToken");
    Cookies.remove("email");
    Router.push("/auth/login");
  };
  return (
    <nav className="navbar">
      <div className="links">
        <div className="logo">Lordkaito&apos;s</div>
        {/* we will need to add an icon menu for smaller screens */}

        <ul className="nav-ul">
          <li className="link home-link">
            <Link href="/home">Home</Link>
          </li>
          <li className="link login-link">
            {appStore.isLoggedIn ? (
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
