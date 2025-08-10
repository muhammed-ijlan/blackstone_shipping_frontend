
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