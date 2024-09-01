import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";
import { AuthProvider } from "./providers";
import { Toaster } from "@/components/atoms/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
    <Toaster richColors />
  </AuthProvider>
);
