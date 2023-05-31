import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import chibi from "@/assets/images/chibi.png";
import Button from "../../components/Button";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import Router from "next/router";
import { FormEvent } from "react";
import { inject, observer } from "mobx-react";
import appStore from "../../../stores/appStore";

const LoginScreen = observer(() => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    appStore.setIsLoggedIn(true);
    let logIn = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let logInJson = await logIn.json();
    console.log(logInJson);
    appStore.setUser({
      userId: Number(logInJson.user.id),
      userEmail: logInJson.user.email,
      username: logInJson.user.name,
    });

    if (logInJson.message === "ok") {
      Cookies.set("sessionToken", logInJson.token, {
        expires: 7,
        sameSite: "lax",
      });
      Cookies.set("email", email, {
        expires: 7,
        sameSite: "lax",
      });
      // Cookies.set("logged", "true", {})
    }
    // obviously we need to change this and apply a proper validation handler
    if (logInJson.message == "error no user found") {
      alert("wrong credentials, please fix that");
    } else {
      Router.push("/userhome");
    }
    setIsLogged(true);
  };

  const redirectToSignUp = () => {
    Router.push("/auth/signup");
  };

  return (
    <>
      <Navbar isLogged={isLogged} />
      <div className="splash-main-cont">
        <section className="main-container">
          <div className="main-card">
            <div className="icon-chibi">
              <Image src={chibi} alt="chibi" className="chibi-img" />
            </div>
            <div className="beni-name-cont">
              <h2 className="name-title">BENIARTS</h2>
              <p className="name-description">♡ ILLUSTRATOR & EMOTE ARTIST ♡</p>
            </div>
            <form className="login-form" onSubmit={(e) => handleLogin(e)}>
              <div className="form-title">
                <h3 className="login-title">Login</h3>
              </div>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="username-input"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="password-input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="button-cont">
                <div className="result">
                  <button
                    className="btn btn-primary"
                    // onClick={(e) => handleLogin(e)}
                  >
                    Login
                  </button>
                </div>
                <div className="result">
                  <button
                    type="button"
                    onClick={redirectToSignUp}
                    className="btn btn-secondary"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
            <div className="google-login">G</div>
            <footer className="footer-container">
              <div className="footer-text">(Made with ❤️ by Beniarts)</div>
            </footer>
          </div>
        </section>
      </div>
    </>
  );
});

// **CHECK FRAMER MOTION FRAMEWORK FOR ANIMATIONS**

export default LoginScreen;
