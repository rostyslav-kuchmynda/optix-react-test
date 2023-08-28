import { useState } from 'react';

export const useWidthObserver = (minWidth: number) => {
  const [isSmallBreakpoint, setIsSmallBreakpoint] = useState(false);

  new ResizeObserver(entries => {
    entries.forEach(entry => {
      const observedWidth = entry.contentRect.width;

      if (observedWidth < minWidth) {
        setIsSmallBreakpoint(true);
      } else {
        setIsSmallBreakpoint(false);
      }
    });
  }).observe(document.body);

  return isSmallBreakpoint;
};
