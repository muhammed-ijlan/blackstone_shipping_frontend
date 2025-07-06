import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollRestorationManager() {
  const location = useLocation();
  const navigationType = useNavigationType(); // PUSH, POP, REPLACE
  const hasScrolledRef = useRef(false);
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    // Initial page load (reload): force scroll to top
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      window.scrollTo({ top: 0, behavior: "auto" }); // immediate
      return;
    }

    hasScrolledRef.current = false;

    if (navigationType === "PUSH") {
      // Scroll to top on link click
      const id = requestAnimationFrame(() => {
        if (!hasScrolledRef.current) {
          hasScrolledRef.current = true;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });

      return () => cancelAnimationFrame(id);
    }

    // For POP or REPLACE: let browser restore
  }, [location, navigationType]);

  // Set scroll restoration behavior
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"; // control it ourselves
    }
  }, []);

  return null;
}
