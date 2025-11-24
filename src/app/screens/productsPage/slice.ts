import {createSlice} from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";


const initialState: ProductsPageState = {
    restaurant: null,
    chosenProduct: null,
    products: []
}

const ProductsPageSlice = createSlice ({
    name: "productsPage",
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
        },

        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload;
        },

        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const {setRestaurant, setChosenProduct, setProducts} = ProductsPageSlice.actions;

const ProductsPageReducer = ProductsPageSlice.reducer;
export default ProductsPageReducer;