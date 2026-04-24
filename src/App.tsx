import * as React from "react";
import { LandingPage } from "./landing/LandingPage";
import { Showcase } from "./showcase/Showcase";
import { TooltipProvider } from "./components/Tooltip";
import { ToastProvider, ToastViewport } from "./components/Toast";

/** Lightweight hash router — no dep. Default shows landing; `#/showcase` shows the DS library. */
function useRoute() {
  const [hash, setHash] = React.useState(() => window.location.hash.replace(/^#/, "") || "/");
  React.useEffect(() => {
    const onChange = () => setHash(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export default function App() {
  const route = useRoute();
  const page = route.startsWith("/showcase") ? <Showcase /> : <LandingPage />;
  return (
    <TooltipProvider delayDuration={200}>
      <ToastProvider>
        {page}
        <ToastViewport />
      </ToastProvider>
    </TooltipProvider>
  );
}
