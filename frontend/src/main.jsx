import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { GigProvider } from "./context/GigContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GigProvider>
      <App />
    </GigProvider>
  </AuthProvider>
);
