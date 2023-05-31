import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import appStore from "../../stores/appStore";
import { useRef } from "react";
import { observer } from "mobx-react";
import Image from "next/image";

const userHome = observer(() => {
  const [userImage, setUserImage] = useState("");
  // SHALL THIS PAGE CONTAIN POSTS AS WELL? //

  const token = Cookies.get("sessionToken") || "";
  const [isLoading, setIsLoading] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputTextRefs = {
    name: useRef<HTMLInputElement>(null),
    description: useRef<HTMLInputElement>(null),
    price: useRef<HTMLInputElement>(null),
    quantity: useRef<HTMLInputElement>(null),
    unlimited: useRef<HTMLInputElement>(null),
  };

  const handleFileUpload = () => {
    if (
      inputFileRef.current &&
      inputFileRef.current.files &&
      inputFileRef.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("userId", appStore.user?.userId.toString());
      formData.append("userEmail", appStore.user.userEmail);
      formData.append("username", appStore.user.username);
      //     username: appStore.user.username,)
      formData.append("image", inputFileRef.current.files[0]);
      formData.append("name", inputTextRefs.name.current?.value || "");
      formData.append(
        "description",
        inputTextRefs.description.current?.value || ""
      );
      formData.append("price", inputTextRefs.price.current?.value || "");
      formData.append("quantity", inputTextRefs.quantity.current?.value || "");
      formData.append(
        "isAvailable",
        inputTextRefs.unlimited.current?.checked ? "true" : "false"
      );

      setIsLoading(true);

      fetch("/api/users/profileImage", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Imagen subida:", data);
          // Lógica adicional, como mostrar un mensaje de éxito, actualizar la vista, etc.
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al subir la imagen:", error);
          // Lógica adicional, como mostrar un mensaje de error, manejar errores, etc.
          setIsLoading(false);
        });
    } else {
      console.error("No se ha seleccionado ninguna imagen");
      // Lógica adicional, como mostrar un mensaje de error o hacer algo en caso de que no se seleccione ninguna imagen.
    }

    // e.preventDefault();
    // let newItem = await fetch("/api/items/create", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     userId: appStore.user.userId,
    //     userEmail: appStore.user.userEmail,
    //     username: appStore.user.username,
    //     name: itemName,
    //     description: itemDescription,
    //     price: itemPrice,
    //     unlimited: itemUnlimited,
    //     quantity: itemQuantity,
    //     image: itemImage,
    //   }),
    // })
    // let newItemJson = await newItem.json();
    // console.log(newItemJson)
  };

  const getUserImage = async () => {
    const userImage = await fetch(`/api/users/${appStore.user.userId}`);
    const userImageJson = await userImage.json();
    console.log(userImageJson);
    const path = `/uploads/${userImageJson.image}`;
    setUserImage(path);
  };

  // this function will allow us to control the user login with the token
  useEffect(() => {
    // get user image from the database
    getUserImage();

    console.log(appStore.user.userId);

    if (token !== "undefined") {
      fetch("/api/users/checkLogIn", {
        method: "POST",
        body: JSON.stringify({
          token: token,
        }),
      }).then((res) => {
        if (res.status === 200) {
          Router.push("/userhome");
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
  return (
    <>
      <Navbar />
      This is the home screen
      <div>
        <div>
          <label>Imagen:</label>
          <input type="file" ref={inputFileRef} onChange={handleFileChange} />
        </div>
        <button onClick={handleFileUpload}>
          {/* {isLoading ? "Subiendo imagen..." : "Subir imagen"} */}click
        </button>
      </div>
      <div>
        <Image src={userImage} alt="none" width={100} height={100}></Image>
      </div>
    </>
  );
});

//this is the main page for those who has been logged in (user home screen)

export default userHome;
