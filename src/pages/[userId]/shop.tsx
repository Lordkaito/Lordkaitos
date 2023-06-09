import React from "react";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import appStore from "../../../stores/appStore";
import { observer } from "mobx-react";
import Item from "@/controllers/Item";
import { set } from "mobx";

const Shop = observer(() => {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<Number[]>([]); // [Item
  const router = useRouter();
  const { userId, id } = router.query;
  const getItems = async () => {
    const form = new FormData();
    form.append("userId", userId as string);
    const res = await fetch(`/api/items/getAll`, {
      method: "POST",
      body: form,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data.items);
      });
  };
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    setIsLogged(appStore.isLoggedIn);
    getItems();
    console.log(cart);
  }, [cart]);
  const addToCart = async (item: Item) => {
    setCart([...cart, item.id]);
  };
  return (
    <>
      <Navbar isLogged={isLogged} />
      <div>Shopsss</div>
      <div>
        <ul>
          {items
            ? items.map((item: Item) => (
                <>
                  <li>
                    {item.name}, {item.price}&euro;
                  </li>{" "}
                  <button onClick={() => addToCart(item)}>Buy</button>
                </>
              ))
            : null}
        </ul>
      </div>
    </>
  );
});

export default Shop;
