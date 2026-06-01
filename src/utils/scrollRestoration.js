export function scrollToTopOnRouteChange(previousPathname, currentPathname, targetWindow = window) {
  if (previousPathname === currentPathname || !targetWindow?.scrollTo) {
    return;
  }

  targetWindow.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}
