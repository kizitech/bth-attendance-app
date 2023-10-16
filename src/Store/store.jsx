import { configureStore } from "@reduxjs/toolkit";

import TodoReducer from "./ToDoSlice.jsx";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});

export default store;
