import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import App from "./App";
import ServicePage from "./pages/ServicePage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Switch>
    <Route path="/services/:slug" component={ServicePage} />
    <Route component={App} />
  </Switch>
);
