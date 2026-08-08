import { createPortal } from 'preact/compat';
import { useState, useEffect } from 'preact/hooks';

export const WIPBanner = ({ duration = {duration} }) => {
  const [visible, setVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, Math.max(0, duration - 300));
    const unMountBanner = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unMountBanner);
    };
  }, [duration]);

  if (!visible) return null;

  return createPortal(
    <div className={`fixed top-22 left-1/2 -translate-x-1/2 z-50 animate-bounce transition-opacity duration-300 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      >
      <div className="bg-white text-black text-[clamp(0.2rem,4cqw,0.75rem)] px-1 py-2 rounded-lg font-bold">
        Hello, This site is still work in progress.
      </div>
    </div>,
    document.body
  );
};