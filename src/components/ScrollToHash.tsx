import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type ScrollToHashProps = {
  deps?: React.DependencyList;
  offset?: number;
};

export default function ScrollToHash({ deps = [], offset = 0 }: ScrollToHashProps) {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const getMobileOffset = () => {
      return 180;
    };

    const getOffset = () => (window.innerWidth <= 768 ? getMobileOffset() : offset);

    let attempts = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        const elementPosition = el.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - getOffset();

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        clearInterval(timer);
      }
      if (++attempts > 10) clearInterval(timer);
    }, 100);

    return () => clearInterval(timer);
  }, [hash, offset, ...deps]);

  return null;
}
