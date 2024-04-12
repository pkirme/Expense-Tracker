import { Switch, Route, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { expenseActions } from "./store/expense";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import WelcomePage from "./pages/WelcomePage";
import ProfilePage from "./pages/ProfilePage";

import axios from "axios";

import "./App.css";

function App() {
  const url = `https://expensetracker-8fe52-default-rtdb.firebaseio.com`;

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const userEmail = useSelector((state) => state.auth.email);

  const fetchDataFromDatabaseHandler = useCallback(async () => {
    if (isAuth) {
      const email = userEmail.replace(/[.@]/g, "");
      const getData = await axios.get(`${url}/${email}.json`);
      console.log(getData);
      const dataList = [];
      let totalAmount = 0;
      for (const key in getData.data) {
        const data = {
          id: key,
          money: getData.data[key].money,
          description: getData.data[key].description,
          category: getData.data[key].category,
        };
        dataList.push(data);
        totalAmount += parseInt(data.money);
      }
      dispatch(expenseActions.setInitialData({ dataList, totalAmount }));
    } else {
      return;
    }
  }, [isAuth]);

  useEffect(() => {
    fetchDataFromDatabaseHandler();
  }, [fetchDataFromDatabaseHandler]);

  return (
    <Switch>
      {isAuth && (
        <Route path="/" exact>
          <WelcomePage />
        </Route>
      )}
      {isAuth && (
        <Route path="/profile">
          <ProfilePage />
        </Route>
      )}

      {!isAuth && (
        <Route path="/" exact>
          <Login />
        </Route>
      )}

      {!isAuth && (
        <Route path="/signup">
          <SignUp />
        </Route>
      )}

      {!isAuth && (
        <Route>
          <Redirect to="/" />
        </Route>
      )}
    </Switch>
  );
}

export default App;
