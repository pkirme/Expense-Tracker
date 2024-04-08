import React, { createContext, useState, useCallback, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const ExpenseDatabaseContext = createContext();
export const ExpenseDatabaseContextProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const authCtx = useContext(AuthContext);
  const isUserLoggedIn = authCtx.isLoggedIn;

  const url = `https://expensetracker-8fe52-default-rtdb.firebaseio.com`;

  const fetchDataFromDatabaseHandler = useCallback(async () => {
    if (isUserLoggedIn) {
      const email = authCtx.email.replace(/[.@]/g, "");
      const getData = await axios.get(`${url}/${email}.json`);
      console.log(getData);
      const dataList = [];
      for (const key in getData.data) {
        const data = {
          id: key,
          money: getData.data[key].money,
          description: getData.data[key].description,
          category: getData.data[key].category,
        };
        dataList.push(data);
      }
      setExpenses(dataList);
      console.log(expenses);
    } else {
      return;
    }
  }, []);

  const addExpenseHandler = async (expense, request) => {
    try {
      if (isUserLoggedIn) {
        const email = authCtx.email.replace(/[.@]/g, "");
        if (request === "add") {
          await axios.post(`${url}/${email}.json`, expense);
          await fetchDataFromDatabaseHandler();
        } else {
          const list = {
            money: expense.money,
            description: expense.description,
            category: expense.category,
          };
          await axios.put(`${url}/${email}/${expense.id}/.json`, list);
          await fetchDataFromDatabaseHandler();
        }
      } else {
        return;
      }
    } catch (error) {}
  };

  const deleteExpenseHandler = async (id) => {
    try {
      if (isUserLoggedIn) {
        const email = authCtx.email.replace(/[.@]/g, "");
        await axios.delete(`${url}/${email}/${id}/.json`);
        await fetchDataFromDatabaseHandler();
      } else {
        return;
      }
    } catch (error) {}
  };

  const expenseContext = {
    data: expenses,
    fetchDataFromDatabase: fetchDataFromDatabaseHandler,
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
