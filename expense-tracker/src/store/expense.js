import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setInitialData(state, action) {
      state.expenses = action.payload;
      console.log(state.expenses);
    },
    addExpense(state, action) {
      state.expenses.push(action.payload);
    },
    updateExpense(state, action) {
      const { id, money, description, category } = action.payload;
      const existingIndex = state.expenses.findIndex(
        (expense) => expense.id === id
      );
      state.expenses[existingIndex] = { id, money, description, category };
    },
    removeExpense(state, action) {
      const updatedList = state.expenses.filter(
        (item) => item.id !== action.payload
      );
      state.expenses = updatedList;
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
