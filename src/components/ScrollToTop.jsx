import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToTopOnRouteChange } from '../utils/scrollRestoration.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    scrollToTopOnRouteChange(previousPathname.current, pathname);
    previousPathname.current = pathname;
  }, [pathname]);

  return null;
}

export default ScrollToTop;
