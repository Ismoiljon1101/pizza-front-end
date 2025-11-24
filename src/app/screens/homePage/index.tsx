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
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { Button } from "../../components/ui/button";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

const pizzaParticles = [
  { emoji: "🍕", angle: 0, delay: 0 },
  { emoji: "🌿", angle: 72, delay: 2 },
  { emoji: "🍅", angle: 144, delay: 4 },
  { emoji: "🧀", angle: 216, delay: 6 },
  { emoji: "🌶️", angle: 288, delay: 8 },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(dispatch);
  const history = useHistory();

  useEffect(() => {
    // Backend data fetching
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.PIZZA,
      })
      .then((data) => setPopularDishes(data))
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.PIZZA,
      })
      .then((data) => setNewDishes(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, [setNewDishes, setPopularDishes, setTopUsers]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-2 md:space-y-16 lg:space-y-24 pb-20 md:pb-24 pt-2 md:pt-20">
        <section className="container mx-auto px-2 md:px-4">
          <div className="glass rounded-xl md:rounded-[2rem] lg:rounded-[3rem] p-2 md:p-8 lg:p-12 xl:p-16 relative overflow-hidden">
            {/* Decorative blobs inside the card */}
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              {/* Left: Text and Buttons */}
              <div className="space-y-3 md:space-y-6 text-center lg:text-left order-2 lg:order-1">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2 md:px-4 py-0.5 md:py-1.5 backdrop-blur-sm">
                  <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-primary mr-1 md:mr-2 animate-pulse"></span>
                  <span className="text-[8px] md:text-xs font-semibold uppercase tracking-wider text-primary">
                    The Best Pizza in Town
                  </span>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight">
                  Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">Soul</span> <br />
                  of Authentic Pizza
                </h1>

                <p className="max-w-2xl text-xs md:text-base lg:text-lg text-muted-foreground mx-auto lg:mx-0">
                  Hand-tossed dough, garden-fresh ingredients, and a wood-fired finish.
                  Experience the perfect slice that brings people together.
                </p>

                <div className="flex flex-row items-center justify-center lg:justify-start gap-2 md:gap-4">
                  <Button size="lg" className="h-9 md:h-12 lg:h-14 rounded-full px-5 md:px-6 lg:px-8 text-xs md:text-base lg:text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all" onClick={() => history.push("/products")}>
                    Order Now
                  </Button>
                  <Button size="lg" variant="outline" className="h-9 md:h-12 lg:h-14 rounded-full border-2 px-5 md:px-6 lg:px-8 text-xs md:text-base lg:text-lg hover:bg-secondary/50" onClick={() => history.push("/help")}>
                    View Menu
                  </Button>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-6 pt-2 md:pt-4">
                  <div className="flex -space-x-2 md:-space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-7 w-7 md:h-9 md:w-9 lg:h-10 lg:w-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                        <img src={`/img/user${i}.svg`} alt="user" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs md:text-sm font-medium">
                    <span className="text-primary">1000+</span> Happy Customers
                  </div>
                </div>
              </div>

              {/* Right: Pizza Animation */}
              <div className="relative order-1 lg:order-2">
                <div className="pizza-stage mx-auto aspect-square max-w-[220px] md:max-w-[350px] lg:max-w-[450px]">
                  <div className="pizza-core h-full w-full">
                    {pizzaParticles.map((particle, index) => (
                      <div
                        key={index}
                        className="pizza-particle"
                        style={
                          {
                            "--start-angle": `${particle.angle}deg`,
                            "--delay": `-${particle.delay}s`,
                          } as React.CSSProperties
                        }
                      >
                        {particle.emoji}
                      </div>
                    ))}
                    <img
                      src="/img/pizza-hero.png"
                      alt="Delicious Pizza"
                      className="absolute inset-0 h-full w-full object-contain p-4 md:p-6 lg:p-8 drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Statistics />
        <PopularDishes />
        <NewDishes />
        <Advertisement />
        <Events />
        <ActiveUsers />
      </div>
    </div>
  );
}