import React from "react";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import Main from "./pages/Main";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="w-screen">
        <Main />
      </div>
    </Provider>
  );
};

export default App;
