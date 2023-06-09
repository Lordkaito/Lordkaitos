import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import appStore from "../../stores/appStore";
import { useRef } from "react";
import { observer } from "mobx-react";
import Image from "next/image";
import Post from "@/controllers/Post";
import Link from "next/link";
// import { PayPalButtons } from "@paypal/react-paypal-js";
// import { loadStripe } from "@stripe/stripe-js";
// import Stripe from "stripe";
// const stripePromise = loadStripe("pk_test_51NGSM8IVk8RfOzXrPBAr8XI8saJat6UnUz65Py3alSaOQafwCdyWCxDR4dXO5JDeK3KI2i9mvND54jZBWePtO2KG00qn1WC7M1");
// console.log(stripePromise);
const Home = observer(() => {
  const token = Cookies.get("sessionToken") || null;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userImage, setUserImage] = useState("");

  const inputFileRef = useRef<HTMLInputElement>(null);

  const inputTextRefs = {
    name: useRef<HTMLInputElement>(null),
    post: useRef<HTMLInputElement>(null),
  };

  const handleNewPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", appStore.user?.userId.toString());
    formData.append("username", appStore.user.username);
    formData.append("post", inputTextRefs.post.current?.value || "");

    setIsLoading(true);

    fetch("/api/posts/create", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        getUserPosts();
      })
      .catch((error) => {
        console.error("error", error);
        setIsLoading(false);
        getUserPosts();
      });
    setInputValue("");
  };

  const getUserImage = async () => {
    const userImage = await fetch(`/api/users/${appStore.user.userId}`);
    const userImageJson = await userImage.json();
    const path = `/uploads/${userImageJson.image}`;
    setUserImage(path);
  };

  const getUserPosts = async () => {
    const form = new FormData();
    form.append("userId", appStore.user.userId.toString());
    const userPosts = await fetch("api/posts/getAllForUser", {
      method: "POST",
      body: form,
    }).then((res) =>
      res.json().then((data) => {
        if (data.posts !== posts) {
          setPosts(data.posts);
        }
      })
    );
  };

  // this function will allow us to control the user login with the token
  useEffect((): void => {
    // get user image from the database
    getUserImage();

    if (token !== null) {
      fetch("/api/users/checkLogIn", {
        method: "POST",
        body: JSON.stringify({
          token: token,
        }),
      }).then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          Router.push("/home");
        } else {
          setIsLoggedIn(false);
          Router.push("/auth/login");
        }
      });
      getUserPosts();
    } else {
      setIsLoggedIn(false);
      Router.push("/auth/login");
    }
  }, [token]);

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    // Lógica adicional a realizar cuando el archivo cambia, si es necesario.
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    // Lógica adicional a realizar cuando el archivo cambia, si es necesario.
  };

  const refreshPosts = async () => {
    getUserPosts();
  };

  const inputFileRefss = useRef<HTMLInputElement>(null);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    inputFileRefss.current?.click();
  };

  const handleInputContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };
  return (
    <>
      {/* <div>
          <Image src={userImage} alt="none" width={100} height={100}></Image>
        </div> */}
      {/* <div>
          <label>Imagen:</label>
          <input type="file" ref={inputFileRef} onChange={handleFileChange} />
        </div>
        <button onClick={handleFileUpload}>
          {isLoading ? "Subiendo imagen..." : "Subir imagen"}click
        </button> */}
      <Navbar isLogged={isLoggedIn} />
      <main id="main">
        <aside className="aside-menu">
          <ul
            className="aside-navbar"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <button onClick={refreshPosts}>Home</button>
            <button>Search</button>
            <button>Messages</button>
            <button>
              <Link href={`/${appStore.user.userId}/shop`}>
                Shopp
              </Link>
            </button>
            <button>Profile</button>
            <button>Settings</button>
          </ul>
        </aside>
        <section className="main-posts">
          <div className="new-post">
            <form>
              <input
                type="text"
                ref={inputTextRefs.post}
                value={inputValue}
                onChange={handleInputContentChange}
              />
              <div className="assets">
                <ul className="post-assets-options">
                  <button onClick={(e) => handleClick(e)}>Image</button>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={inputFileRefss}
                  />
                  <li>Video</li>
                  <li>Audio</li>
                  <li>File</li>
                </ul>
              </div>
              <button onClick={(e) => handleNewPost(e)}>
                {isLoading ? "Loading..." : "Post"}
              </button>
            </form>
          </div>
          <div className="posts">
            {posts
              ? posts.map((post: Post) => (
                  <div>
                    <div
                      className="post"
                      key={
                        post.id
                      } /*style={{display: post.published ? "block" : "none"}} we can do this later */
                    >
                      <p>{post.content}</p>
                    </div>
                  </div>
                ))
              : null}
          </div>
          {/* <div id="paypal-button-container" className="paypal-button-container"></div> */}
          {/* <PayPalButtons client-id={process.env.PAYPAL_CLIENT_ID} onInit={() => {console.log('asdads')}} /> */}
        </section>
      </main>
    </>
  );
});

//this is the main page for those who has been logged in (user home screen)

export default Home;
