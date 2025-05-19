import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/pages/App.jsx";
import "./styles/global.css";
import "./styles/animations.css";
import { ResponsiveProvider } from "./context/ResponsiveContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ResponsiveProvider>
        <App />
      </ResponsiveProvider>
    </AuthProvider>
  </StrictMode>,
);
