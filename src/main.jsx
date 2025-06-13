import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import VocabContext from "./context/VocabContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VocabContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VocabContext>
  </StrictMode>
);
