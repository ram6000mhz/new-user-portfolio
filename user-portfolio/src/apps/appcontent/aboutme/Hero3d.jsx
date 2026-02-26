import { useRef, useEffect } from "react";
import { 
  WebGLRenderer, 
  Scene, 
  PerspectiveCamera, 
  TorusGeometry, 
  LineSegments, 
  LineBasicMaterial, 
  EdgesGeometry 
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const Hero3d = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.set(0, 3, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    Object.assign(controls, {
      enableZoom: false,
      autoRotate: true,
      autoRotateSpeed: 5.0,
      enablePan: false
    });

    const geo = new TorusGeometry(2, 1, 15, 15);
    const edges = new EdgesGeometry(geo);
    const lineMat = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    const wireframe = new LineSegments(edges, lineMat);
    scene.add(wireframe);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    const sizeToHost = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / (h || 1);
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", sizeToHost, { passive: true });
    sizeToHost();

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      wireframe.rotation.x += 0.005;
      wireframe.rotation.z += 0.003;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sizeToHost);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geo.dispose();
      edges.dispose();
      lineMat.dispose();
      controls.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full relative" />;
};