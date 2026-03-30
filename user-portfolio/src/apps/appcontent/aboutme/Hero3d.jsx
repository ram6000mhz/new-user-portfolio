import { useRef, useEffect } from "react";

let globalWorker = null;

export const Hero3d = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const sendEventToWorker = (event) => {
      const eventData = {
        type: event.type,
        clientX: event.clientX,
        clientY: event.clientY,
        pageX: event.pageX,
        pageY: event.pageY,
        button: event.button,
        pointerId: event.pointerId,
        deltaX: event.deltaX,
        deltaY: event.deltaY,
        touches: event.touches ? Array.from(event.touches).map(t => ({
          pageX: t.pageX, pageY: t.pageY, clientX: t.clientX, clientY: t.clientY
        })) : []
      };

      globalWorker.postMessage({ type: 'event', data: eventData });
    };

    window.addEventListener('pointerup', sendEventToWorker);
    window.addEventListener('pointermove', sendEventToWorker);

    const eventTypes = [
      'pointerdown', 'pointermove', 'pointerup', 'touchstart', 'touchmove', 'touchend'
    ];
    eventTypes.forEach(type => {
      container.addEventListener(type, sendEventToWorker, { passive: false });
    });

    const offscreen = canvas.transferControlToOffscreen();

    if (!globalWorker){
      globalWorker = new Worker(new URL('./Heroworker3d.js', import.meta.url), { type: 'module' });
    }

    globalWorker.postMessage({
      type: 'init',
      canvas: offscreen,
      width: container.clientWidth,
      height: container.clientHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    }, [offscreen]);

    const resizeObserver = new ResizeObserver(([entry]) => {
        globalWorker.postMessage({
            type: 'resize',
            width: entry.contentRect.width,
            height: entry.contentRect.height
        });
    });

    resizeObserver.observe(container);

    return () => {
      eventTypes.forEach(type => {
        container.removeEventListener(type, sendEventToWorker);
      });
      window.removeEventListener('pointerup', sendEventToWorker);
      window.removeEventListener('pointermove', sendEventToWorker);
      globalWorker.postMessage({ type: 'stop' });
      resizeObserver.disconnect();
    };

  }, []);

  return (
    <div ref={containerRef} className="h-full w-full relative">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};