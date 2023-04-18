import React from "react";
import { Provider } from "react-redux";
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
