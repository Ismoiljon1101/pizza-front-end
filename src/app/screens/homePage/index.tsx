import React, { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import { useDispatch } from "react-redux";
import {Dispatch} from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import "../../../css/home.css"
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";

/** REDUX SLICE & SELECTOR**/

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data))
});

export default function HomePage() {
  const {setPopularDishes, setNewDishes, setTopUsers} = actionDispatch(useDispatch());
  

  //Selector: Store => DATA

  console.log(process.env.REACT_APP_API_URL)

  useEffect(() => {
    const product = new ProductService();
    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.PIZZA,
  }).then(data => {
      console.log("data passed here", data)
      setPopularDishes(data);
  }).catch((err) =>console.log(err));

    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      // productCollection: ProductCollection.DISH,
  }).then(data => {
      setNewDishes(data);
      
  }).catch((err) =>console.log(err));

  const member = new MemberService();

  member.getTopUsers()
  .then(data => {setTopUsers(data);})
  .catch((err) =>console.log(err))

  }, []);

  

    return ( <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
    );
  }