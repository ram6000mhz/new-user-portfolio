import { createPortal } from 'preact/compat';
import { useState, useEffect } from 'preact/hooks';

export const WIPBanner = ({ duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return createPortal(
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-1 animate-bounce">
      <div className="bg-white text-black px-1 py-2 rounded-2xl shadow-lg font-bold text-sm border-2 border-black">
        Hello, This site is still work in progress.
      </div>
    </div>,
    document.body
  );
};