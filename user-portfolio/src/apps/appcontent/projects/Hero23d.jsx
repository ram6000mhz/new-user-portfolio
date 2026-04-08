import { useRef, useEffect } from "preact/hooks";
import { Projectlist } from "./Projectlist";
import { useProjectStore } from "./Projectstore";
import { createIconBitmap } from "../webworkerutil/Bitmaputil";

let globalWorker = null;

export const Hero23d = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const setSelectedProject = useProjectStore((state) => state.setSelectedProject);

    useEffect(() => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;

      if (!globalWorker) {
        globalWorker = new Worker(new URL('./Heroworker23d.js', import.meta.url), { type: 'module' });
      }

      const offscreen = canvas.transferControlToOffscreen();

      const initWorker = async () => {
        const projectData = await Promise.all(
          Projectlist.map(async (p) => {
            const bitmap = await createIconBitmap(p.icon, p.boxcolor);
            return { appid: p.appid, boxcolor: p.boxcolor, iconBitmap: bitmap };
          })
        );

        const bitmaps = projectData.map(p => p.iconBitmap);

        globalWorker.postMessage({
          type: 'init',
          canvas: offscreen,
          width: container.clientWidth,
          height: container.clientHeight,
          pixelRatio: Math.min(window.devicePixelRatio, 2),
          projects: projectData
        }, [offscreen, ...bitmaps]);
      };

      initWorker();

      const sendEventToWorker = (event) => {
        const rect = canvas.getBoundingClientRect();
        globalWorker.postMessage({
          type: 'event',
          data: {
            type: event.type,
            clientX: event.clientX - rect.left,
            clientY: event.clientY - rect.top,
            rectWidth: rect.width,
            rectHeight: rect.height,
            button: event.button,
            pointerId: event.pointerId,
            deltaY: event.deltaY,
          }
        });
      };

      globalWorker.onmessage = (e) => {
        if (e.data.type === 'PROJECT_SELECTED') setSelectedProject(e.data.id);
      };

      window.addEventListener('pointerup', sendEventToWorker);
      window.addEventListener('pointermove', sendEventToWorker);

      const eventTypes = [
        'pointerdown', 'pointermove', 'pointerup', 'touchstart', 'touchmove', 'touchend'
      ];

      eventTypes.forEach(type => {
        container.addEventListener(type, sendEventToWorker, { passive: false });
      });
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
    }, [setSelectedProject]);

    return (
      <div ref={containerRef} className="h-full w-full relative" style={{touchAction:'none'}}>
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    );
};