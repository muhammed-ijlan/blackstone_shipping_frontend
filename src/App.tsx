
import { useEffect, useRef } from 'react';

import { usePathname } from './routes/hooks';
import { ThemeProvider } from './theme/theme-provider';
import ScrollRestorationManager from './utils/ScrollRestorationManager';
import { Toaster } from "react-hot-toast";
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  // useScrollToTop();


  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && ["c", "u", "s"].includes(e.key.toLowerCase())) ||
        e.key === "F12"
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  const location = useLocation();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;

      if (hash) {
        // Use a timeout to ensure the DOM is ready
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            const yOffset = -200; // Adjust this if you have a fixed navbar
            const y =
              element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 100); // delay helps when route changes and DOM needs time
      }
    };

    scrollToHash(); // Trigger on initial mount and route change

    window.addEventListener("hashchange", scrollToHash); // Trigger on hash change

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [location]);


  return (<main ref={mainRef}>
    <ScrollRestorationManager />
    <ThemeProvider>
      <Toaster reverseOrder={false} />
      <ErrorBoundary >
        {children}
      </ErrorBoundary>
    </ThemeProvider>
  </main>
  );
}

// ----------------------------------------------------------------------
export function useScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  useEffect(() => {
    const handleScrollOnLoad = () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    const timeout = setTimeout(handleScrollOnLoad, 50);

    return () => clearTimeout(timeout);
  }, []);
}