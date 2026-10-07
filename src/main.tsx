import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { basePath } from "./lib/asset";
import "./index.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Rod-elementet #root blev ikke fundet.");
}

const basename = basePath.replace(/\/$/, "");

const tree = (
  <StrictMode>
    <BrowserRouter basename={basename || undefined}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Den prærenderede HTML hydreres, mens udviklingsserveren starter fra bunden.
// Der tjekkes på elementer, så HTML-kommentarer i skabelonen ikke tæller med.
if (container.firstElementChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
