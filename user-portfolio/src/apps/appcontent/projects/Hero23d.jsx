import { useRef, useEffect } from "react";
import { Projectlist } from "./Projectlist";
import { useProjectStore } from "./Projectstore";

let globalWorker = null;

export const Hero23d = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const setSelectedProject = useProjectStore((state) => state.setSelectedProject);

    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      const sendEventToWorker = (event) => {
        const rect = canvas.getBoundingClientRect();
        const eventData = {
          type: event.type,
          clientX: event.clientX - rect.left,
          clientY: event.clientY - rect.top,
          button: event.button,
          pointerId: event.pointerId,
          deltaY: event.deltaY,
        };
        globalWorker.postMessage({ type: 'event', data: eventData });
      };

      window.addEventListener('pointerup', sendEventToWorker);
      window.addEventListener('pointermove', sendEventToWorker);

      const eventTypes = ['pointerdown', 'pointermove', 'pointerup', 'wheel'];
      eventTypes.forEach(type => container.addEventListener(type, sendEventToWorker, { passive: false }));

      const offscreen = canvas.transferControlToOffscreen();

      if (!globalWorker) {
        globalWorker = new Worker(new URL('./Heroworker23d.js', import.meta.url), { type: 'module' });
      }

      globalWorker.onmessage = (e) => {
        if (e.data.type === 'PROJECT_SELECTED') setSelectedProject(e.data.id);
      };

      globalWorker.postMessage({
        type: 'init',
        canvas: offscreen,
        width: container.clientWidth,
        height: container.clientHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        projects: Projectlist.map(p => ({ appid: p.appid, boxcolor: p.boxcolor }))
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
        eventTypes.forEach(type => container.removeEventListener(type, sendEventToWorker));
        window.removeEventListener('pointerup', sendEventToWorker);
        window.removeEventListener('pointermove', sendEventToWorker);
        globalWorker.postMessage({ type: 'stop' });
        resizeObserver.disconnect();
      };
    }, [setSelectedProject]);

    return (
      <div ref={containerRef} className="h-full w-full relative">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    );
};