import "./styles.css";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.querySelector("#root"));

root.render(
  <div>
    <App>
      <h1>My First React App</h1>
      <h2>And a fancy subtitle</h2>
    </App>
  </div>
);