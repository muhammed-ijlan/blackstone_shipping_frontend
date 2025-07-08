
import { useEffect, useRef } from 'react';

import { usePathname } from './routes/hooks';
import { ThemeProvider } from './theme/theme-provider';
import ScrollRestorationManager from './utils/ScrollRestorationManager';
import { Toaster } from "react-hot-toast";
import ErrorBoundary from 'src/components/ErrorBoundary';

// ----------------------------------------------------------------------

type AppProps = {
  children: React.ReactNode;
};

export default function App({ children }: AppProps) {
  const mainRef = useRef<HTMLDivElement | null>(null);
  // useScrollToTop();
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