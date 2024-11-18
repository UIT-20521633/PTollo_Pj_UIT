import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// Import CssBaseline from MUI
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
// Cấu hình redux
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./store/rootReducer";

const store = configureStore({
  reducer: rootReducer,
});
createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </ThemeProvider>
);
