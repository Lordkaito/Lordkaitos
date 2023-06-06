import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import chibi from "@/assets/images/chibi.png";
import Button from "../../components/Button";
import Link from "next/link";
import Image from "next/image";
import { FormEvent } from "react";
import Router from "next/router";
import Cookies from "js-cookie";
import { useEmailValidation } from "@/hooks/useEmailValidation";
import { usePasswordValidation } from "@/hooks/usePasswordValidation";

const SignUp = () => {
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const {
    email,
    emailError,
    handleEmailChange,
    handleEmailBlur,
    validateEmail,
  } = useEmailValidation();

  const {password, passwordError, handlePasswordChange, handlePasswordBlur, validatePassword } =
    usePasswordValidation();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("please enter a valid email");
      return;
    }

    if (!validatePassword(password)) {
      alert("please enter a valid password");
      return;
    }

    if (username === "" || email === "" || password === "") {
      alert("please fill all the fields");
      return;
    }

    let signUp = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    });
    let signUpJson = await signUp.json();
    Cookies.set("sessionToken", signUpJson.token, {
      expires: 7,
      sameSite: "lax",
    });

    if (signUpJson.message === "User created") {
      const res = await logInNewUser();
      if (res.message === "ok") {
        Cookies.set("sessionToken", res.token, {
          expires: 7,
          sameSite: "lax",
        });
        Cookies.set("email", email, {
          expires: 7,
          sameSite: "lax",
        });
        Cookies.set("logged", "true", {});
        Router.push("/home");
      }
      if (res.message === "error no user found") {
        alert("wrong credentials, please fix that");
      } else {
        Router.push("/home");
      }
    } else {
      alert("wrong credentials, please fix that");
      Router.push("/auth/signup");
    }
    // obviously we need to change this and apply a proper validation handler
    // if (signUpJson.message == "error no user found") {
    //   alert("wrong credentials, please fix that");
    // } else {
    //   Router.push("/home");
    // }
  };

  const logInNewUser = async () => {
    const res = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const data = await res.json();
    return data;
  };

  // const validateEmail = (email: string): boolean => {
  //   // Expresión regular para validar el formato de correo electrónico
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //   return emailRegex.test(email);
  // };

  const redirectToLogin = () => {
    Router.push("/auth/login");
  };
  return (
    <>
      <Navbar />
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
            <form className="login-form" onSubmit={(e) => handleSignUp(e)}>
              <div className="form-title">
                <h3 className="login-title">Sign Up</h3>
              </div>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className="username-input"
                onChange={(e) => setUsername(e.target.value)}
                minLength={3}
              />
              <input
                id="email"
                type="email"
                placeholder="mail@mail.com"
                className="email-input"
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                value={email}
              />
              {emailError && <p className="error">{emailError}</p>}
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="password-input"
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                value={password}
                minLength={8}
              />
              <div className="button-cont">
                <div className="result">
                  <button
                    type="button"
                    onClick={redirectToLogin}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
                <div className="result">
                  <button className="btn btn-secondary" type="submit">
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
};

// **CHECK FRAMER MOTION FRAMEWORK FOR ANIMATIONS**

export default SignUp;
