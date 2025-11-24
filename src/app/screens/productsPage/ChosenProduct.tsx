import React, { useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { setChosenProduct, setRestaurant } from "./slice";
import { Product } from "../../../lib/types/product";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { Button } from "../../components/ui/button";
import { Eye, Phone, Store, ShoppingCart } from "lucide-react";

/** REDUX SLICE & SELECTOR **/

const actionDispatch = (dispatch: Dispatch) => ({
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

const chosenProductsRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);

const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({ restaurant })
);

interface ChosenProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductsProps) {
  const { onAdd } = props;
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useDispatch();
  const { setRestaurant, setChosenProduct } = useMemo(
    () => actionDispatch(dispatch),
    [dispatch]
  );

  const { chosenProduct } = useSelector(chosenProductsRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, [productId, setChosenProduct, setRestaurant]);

  if (!chosenProduct) return null;

  return (
    <div className="min-h-screen bg-background pt-2 md:pt-20 pb-24 md:pb-8">
      {/* Mobile: Single Column Layout */}
      <div className="lg:hidden">
        {/* Product Images - Full Width */}
        <div className="bg-card border-b border-border relative">
          <Swiper
            loop={chosenProduct.productImages.length > 1}
            spaceBetween={0}
            navigation={{
              nextEl: ".mobile-swiper-next",
              prevEl: ".mobile-swiper-prev",
            }}
            pagination={chosenProduct.productImages.length > 1 ? { clickable: true } : false}
            autoplay={
              chosenProduct.productImages.length > 1
                ? {
                  delay: 3000,
                  disableOnInteraction: false,
                }
                : false
            }
            modules={[Pagination, Autoplay, Navigation]}
            className="w-full"
          >
            {chosenProduct.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <div className="w-full h-[280px] bg-white flex items-center justify-center">
                    <img
                      className="max-w-full max-h-full object-contain p-4"
                      src={imagePath}
                      alt={chosenProduct.productName}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Arrows - Always Visible */}
          <button className="mobile-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="mobile-swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all">
            <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-4">
          {/* Restaurant & Price */}
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-wider">
              {restaurant?.memberNick || "Pizza House"}
            </p>
            <h1 className="text-xl font-bold mt-1 mb-2">
              {chosenProduct.productName}
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-primary">
                ${chosenProduct.productPrice}
              </p>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{chosenProduct.productViews} views</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {chosenProduct.productDesc || "Delicious pizza made with fresh ingredients and authentic recipes."}
            </p>
          </div>

          {/* Restaurant Info */}
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-semibold mb-3">Restaurant Info</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                  <Store className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Restaurant</p>
                  <p className="text-sm font-medium">{restaurant?.memberNick || "Pizza House"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Contact</p>
                  <p className="text-sm font-medium">{restaurant?.memberPhone || "+971 4 554 7777"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background border-t border-border z-10">
          <Button
            size="lg"
            className="w-full h-12 text-base font-semibold rounded-lg shadow-lg"
            onClick={() =>
              onAdd({
                _id: chosenProduct._id,
                quantity: 1,
                name: chosenProduct.productName,
                price: chosenProduct.productPrice,
                image: chosenProduct.productImages[0],
              })
            }
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart - ${chosenProduct.productPrice}
          </Button>
        </div>
      </div>

      {/* Desktop: Two Column Layout */}
      <div className="hidden lg:block container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          {/* Left: Product Image */}
          <div className="bg-card rounded-xl p-6 border border-border overflow-hidden relative">
            <Swiper
              loop={chosenProduct.productImages.length > 1}
              spaceBetween={10}
              navigation={{
                nextEl: ".desktop-swiper-next",
                prevEl: ".desktop-swiper-prev",
              }}
              pagination={chosenProduct.productImages.length > 1 ? { clickable: true } : false}
              autoplay={
                chosenProduct.productImages.length > 1
                  ? {
                    delay: 3000,
                    disableOnInteraction: false,
                  }
                  : false
              }
              modules={[FreeMode, Navigation, Thumbs, Autoplay, Pagination]}
              className="rounded-lg"
            >
              {chosenProduct.productImages.map((ele: string, index: number) => {
                const imagePath = `${serverApi}/${ele}`;
                return (
                  <SwiperSlide key={index}>
                    <div className="w-full h-[600px] xl:h-[700px] bg-muted/20 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={imagePath}
                        alt={chosenProduct.productName}
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Navigation Arrows - Always Visible */}
            <button className="desktop-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all">
              <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="desktop-swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all">
              <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="text-sm text-primary font-semibold uppercase tracking-wider">
                    {restaurant?.memberNick || "Pizza House"}
                  </p>
                  <h1 className="text-3xl font-bold mt-2">
                    {chosenProduct.productName}
                  </h1>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-primary">
                    ${chosenProduct.productPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{chosenProduct.productViews} views</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-base font-semibold mb-2">Description</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {chosenProduct.productDesc || "Delicious pizza made with fresh ingredients and authentic recipes."}
                </p>
              </div>

              <Button
                size="lg"
                className="w-full mt-6 h-14 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                onClick={() =>
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    name: chosenProduct.productName,
                    price: chosenProduct.productPrice,
                    image: chosenProduct.productImages[0],
                  })
                }
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-base font-semibold mb-4">Restaurant Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                    <Store className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Restaurant</p>
                    <p className="text-base font-medium">{restaurant?.memberNick || "Pizza House"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Contact</p>
                    <p className="text-base font-medium">{restaurant?.memberPhone || "+971 4 554 7777"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
