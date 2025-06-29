import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AdminProvider } from "./config/AdminContext.jsx";
import Toaster from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
    <Toaster />
  </StrictMode>
);
