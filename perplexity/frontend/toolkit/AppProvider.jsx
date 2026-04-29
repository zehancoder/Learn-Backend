import React from "react";
import { Provider } from "react-redux";
import { store } from "./app.store.js";
function AppProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default AppProvider;
