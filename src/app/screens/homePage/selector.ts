import { createSelector } from "reselect";
import { AppRootState, HomePageState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage

export const retrievePopularDishes = createSelector(
    selectHomePage, 
    (homePage: HomePageState)=> homePage.popularDishes
)
    
export const retrieveNewDishes = createSelector(
    selectHomePage, 
    (homePage: HomePageState)=> homePage.newDishes
)
    
export const retrieveTopUsers = createSelector(
    selectHomePage, 
    (homePage: HomePageState)=> homePage.topUsers
)