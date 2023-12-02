import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SharingProvider } from "./context/SharingContext";
import "./css/cssimport";

const el = document.getElementById("root");

const root = ReactDOM.createRoot(el);

root.render(
  <BrowserRouter>
    <SharingProvider>
      <App />
    </SharingProvider>
  </BrowserRouter>
);
