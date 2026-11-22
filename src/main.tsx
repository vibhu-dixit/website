import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App.tsx";
import "./index.css";
import "./editorial.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL;
const app = <App />;
createRoot(document.getElementById("root")!).render(
  convexUrl ? <ConvexProvider client={new ConvexReactClient(convexUrl)}>{app}</ConvexProvider> : app,
);
