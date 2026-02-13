import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // <--- CHANGE THIS IMPORT

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App /> {/* <--- CHANGE THIS COMPONENT */}
  </React.StrictMode>
);
