import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import reduxLogger from "redux-logger"
import HomePageReducer from '../app/screens/homePage/slice';
import ProductPageReducer from './screens/productsPage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => 
    //@ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    productPage: ProductPageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
