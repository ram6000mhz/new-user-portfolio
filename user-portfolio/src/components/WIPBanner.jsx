import { createPortal } from 'preact/compat';
import { useState, useEffect } from 'preact/hooks';

export const WIPBanner = ({ duration = {duration} }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return createPortal(
    <div className="fixed top-22 left-1/2 -translate-x-1/2 z-1 animate-bounce">
      <div className="bg-white text-black text-[clamp(0.2rem,4cqw,0.75rem)] px-1 py-2 rounded-lg font-bold">
        Hello, This site is still work in progress.
      </div>
    </div>,
    document.body
  );
};