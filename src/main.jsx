import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LilaHomepage from "./LilaHomepage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LilaHomepage />
  </StrictMode>
);
