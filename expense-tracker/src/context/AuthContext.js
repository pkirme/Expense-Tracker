import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLogeddIn: false,
  login: (token) => {},
  logOut: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(userEmail);
  const isUserLoggedIn = !!token;

  const loginHandler = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setToken(token);
    setEmail(email);
  };

  //logout function
  const logOutHandler = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");

    setToken(null);
    setEmail("");
  };

  const contextValue = {
    token: token,
    email: email,
    isLoggedIn: isUserLoggedIn,
    login: loginHandler,
    logOut: logOutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
