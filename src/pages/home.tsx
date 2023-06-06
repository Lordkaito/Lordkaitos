import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import appStore from "../../stores/appStore";
import { useRef } from "react";
import { observer } from "mobx-react";
import Image from "next/image";

const Home = observer(() => {
  console.log(appStore.user);
  const [userImage, setUserImage] = useState("");

  const token = Cookies.get("sessionToken") || null;
  const [isLoading, setIsLoading] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputTextRefs = {
    name: useRef<HTMLInputElement>(null),
    post: useRef<HTMLInputElement>(null),
  };

  const handleNewPost = (e: any) => {
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
        console.log("attempt", data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("error", error);
        // Lógica adicional, como mostrar un mensaje de error, manejar errores, etc.
        setIsLoading(false);
      });
  };

  const getUserImage = async () => {
    const userImage = await fetch(`/api/users/${appStore.user.userId}`);
    const userImageJson = await userImage.json();
    console.log(userImageJson);
    const path = `/uploads/${userImageJson.image}`;
    setUserImage(path);
  };

  // this function will allow us to control the user login with the token
  useEffect((): void => {
    console.log(appStore.user.userId)
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
          Router.push("/home");
        } else {
          Router.push("/auth/login");
        }
      });
    } else {
      Router.push("/auth/login");
    }
  }, [token]);

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    // Lógica adicional a realizar cuando el archivo cambia, si es necesario.
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    // Lógica adicional a realizar cuando el archivo cambia, si es necesario.
  };

  const inputFileRefss = useRef<HTMLInputElement>(null);

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    console.log("click");
    inputFileRefss.current?.click();
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
      <Navbar />
      <main>
        <aside>
          <ul className="aside-navbar">
            <li>Home</li>
            <li>Search</li>
            <li>Messages</li>
            <li>Shop</li>
            <li>Profile</li>
            <li>Settings</li>
          </ul>
        </aside>
        <section>
          <div className="new-post">
            <form>
              <input type="text" ref={inputTextRefs.post} />
              <div className="assets">
                <ul className="post-assets-options">
                  <button onClick={(e) => handleClick(e)}>Image</button>
                  <input type="file" style={{display: "none"}} ref={inputFileRefss} />
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
        </section>
      </main>
    </>
  );
});

//this is the main page for those who has been logged in (user home screen)

export default Home;
