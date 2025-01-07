import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import "../../../css/home.css";

/** REDUX SLICE & SELECTOR  **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});



export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());

  useEffect(() => {
    // Fetch popular dishes
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH
      })
      .then((data: Product[]) => {
        console.log("Popular dishes data:", data);
        setPopularDishes(data);
      })
      .catch((err: unknown) => console.log("Error fetching popular dishes:", err));

    // Fetch new dishes
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.DISH
      })
      .then((data: Product[]) => {
        console.log("New dishes data:", data);
        setNewDishes(data);
      })
      .catch((err: unknown) => console.log("Error fetching new dishes:", err));

    // Fetch top users
    const member = new MemberService();
    member.getTopUsers()
      .then((data: Member[]) => {
        console.log("Top users data:", data);
        setTopUsers(data);
      })
      .catch((err: unknown) => console.log("Error fetching top users:", err));

  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}