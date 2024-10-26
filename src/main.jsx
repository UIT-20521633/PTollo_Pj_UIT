import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Cấu hình redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
