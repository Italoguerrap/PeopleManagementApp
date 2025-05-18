import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/pages/App.jsx";
import "./styles/global.css";
import { ResponsiveProvider } from "./context/ResponsiveContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ResponsiveProvider>
      <App />
    </ResponsiveProvider>
  </StrictMode>,
);
