import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth";
import expenseReducer from "../store/expense";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer },
});

export default store;
