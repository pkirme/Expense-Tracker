import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth";
import expenseReducer from "../store/expense";
import themeReducer from "../store/theme";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme: themeReducer },
});

export default store;
