import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

// Bootstrap configuration.
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import { AuthContextProvider } from "./context/AuthContext";
import { ExpenseDatabaseContextProvider } from "./context/ExpenseDatabaseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ExpenseDatabaseContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ExpenseDatabaseContextProvider>
  </AuthContextProvider>
);
