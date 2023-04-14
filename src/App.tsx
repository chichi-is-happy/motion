import React from "react";
import { Provider } from "react-redux";
import Greetings from "./Greetings";
import Counter from "./Counter";
import MyForm from "./MyForm";
import store from "./store/configureStore";
import Main from "./pages/Main";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
