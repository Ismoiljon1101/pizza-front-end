import { createSelector } from "@reduxjs/toolkit";
import { AppRootState, ProductPageState } from "../../../lib/types/screen";

const selectProductPage = (state:AppRootState) => state.productPage

export const retrieveRestaurant = createSelector(
    selectProductPage,
    (productPage: ProductPageState) => productPage.restaurant
)

export const retrieveChosenProduct = createSelector(
    selectProductPage,
    (productPage: ProductPageState) => productPage.chosenProduct
)

export const retrieveProducts = createSelector(
    selectProductPage,
    (productPage: ProductPageState) => productPage.products
)
