// redux/configureStore.js
import { configureStore } from "@reduxjs/toolkit";
import content from "./content";
import image from "./image";
import file from "./file";
import category from "./category";

const store = configureStore({
  reducer: {
    content,
    image,
    file,
    category,
  },
});
export default store;
