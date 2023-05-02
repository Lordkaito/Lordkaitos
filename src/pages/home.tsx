import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import Router from "next/router";
import { useEffect, useState } from "react";
import { FormEvent } from "react";
import appStore from "../../stores/appStore";

const Home = () => {
  const token = Cookies.get("sessionToken") || "";
  const [isLogged, setIsLogged] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [itemUnlimited, setItemUnlimited] = useState(true);

  console.log(appStore.user.userId);

  const handleNewItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let newItem = await fetch("/api/items/create", {
      method: "POST",
      body: JSON.stringify({
        userId: appStore.user.userId,
        userEmail: appStore.user.userEmail,
        username: appStore.user.username,
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        unlimited: itemUnlimited,
        quantity: itemQuantity,
      }),
    })
    let newItemJson = await newItem.json();
    console.log(newItemJson)
  }

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
      <form onSubmit={(e) => handleNewItem(e)}>
        <input type="text" placeholder="item name" onChange={(e) => setItemName(e.target.value)}/>
        <input type="text" placeholder="item description" onChange={(e) => setItemDescription(e.target.value)}/>
        <input type="number" placeholder="item price" onChange={(e) => setItemPrice(Number(e.target.value))} />
        <input type="number" placeholder="item quantity" onChange={(e) => setItemQuantity(Number(e.target.value))}/>
        <input type="checkbox" name="unlimited" id="" onChange={(e) => setItemUnlimited(e.target.checked)}/>
        <button type="submit">Send</button>
      </form>
    </>
  );
};

//this is the main page for those who has been logged in (user home screen)

export default Home;
