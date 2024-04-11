import React, { createContext, useState } from "react";

const ExpenseDatabaseContext = createContext();
export const ExpenseDatabaseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = async (expense, status) => {
    if (status === "update") {
      const updatedItem = expenses.map((item) => {
        if (item.id === expense.id) {
          return {
            ...item,
            money: expense.money,
            description: expense.description,
            category: expense.category,
          };
        }
        return item;
      });
      setExpenses(updatedItem);
    } else {
      setExpenses((prev) => [...prev, expense]);
    }
  };

  const deleteExpenseHandler = async (id) => {
    const updatedList = expenses.filter((item) => item.id !== id);
    setExpenses(updatedList);
  };

  const expenseContext = {
    data: expenses,
    setData: setExpenses,
    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
  };
  return (
    <ExpenseDatabaseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseDatabaseContext.Provider>
  );
};

export default ExpenseDatabaseContext;
