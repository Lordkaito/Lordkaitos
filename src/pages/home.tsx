import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import appStore from "../../stores/appStore";
import { useRef } from "react";

const Home = () => {
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

      fetch("/api/items/create", {
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

  // this function will allow us to control the user login with the token
  useEffect(() => {
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
  }, [token]);
  // ir order to create a logout method and to store session, you will need to use localstorage

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
          <label>Nombre:</label>
          <input type="text" ref={inputTextRefs.name} />
        </div>
        <div>
          <label>Descripción:</label>
          <input type="text" ref={inputTextRefs.description} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" ref={inputTextRefs.price} />
        </div>
        <div>
          <label>Cantidad:</label>
          <input type="number" ref={inputTextRefs.quantity} />
        </div>
        <div>
          <label>Disponible:</label>
          <input type="checkbox" ref={inputTextRefs.unlimited} />
        </div>
        <div>
          <label>Imagen:</label>
          <input type="file" ref={inputFileRef} onChange={handleFileChange} />
        </div>
        <button onClick={handleFileUpload} >
          {/* {isLoading ? "Subiendo imagen..." : "Subir imagen"} */}click
        </button>
      </div>
    </>
  );
};

//this is the main page for those who has been logged in (user home screen)

export default Home;
