import { useRef, useEffect } from "react";
import { 
  WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, 
  LineSegments, LineBasicMaterial, EdgesGeometry, Group 
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const Hero23d = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.set(0, 0, 4);

    const controls = new OrbitControls(camera, renderer.domElement);
    Object.assign(controls, { enableZoom: false, autoRotate: true, enablePan: false });

    const group = new Group();
    const geo = new BoxGeometry(1, 1, 1);
    const lineMat = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
    
    const spacing = 1; 
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) {
        for (let z = 0; z < 2; z++) {
          const edges = new EdgesGeometry(geo);
          const wireframe = new LineSegments(edges, lineMat);
          wireframe.position.set(
            (x - 0.5) * spacing, 
            (y - 0.5) * spacing, 
            (z - 0.5) * spacing
          );
          group.add(wireframe);
        }
      }
    }
    scene.add(group);

    let isVisible = true;
    const observer = new IntersectionObserver(([e]) => isVisible = e.isIntersecting);
    observer.observe(container);

    const sizeToHost = () => {
      const { clientWidth: w, clientHeight: h } = container;
      renderer.setSize(w, h);
      camera.aspect = w / (h || 1);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", sizeToHost);
    sizeToHost();

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      group.rotation.y += 0.01;
      group.rotation.x += 0.005;
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
      lineMat.dispose();
      group.children.forEach(child => child.geometry.dispose());
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full relative" />;
};