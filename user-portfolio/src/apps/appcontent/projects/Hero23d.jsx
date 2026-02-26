import { useRef, useEffect } from "react";
import { 
  WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, Mesh, MeshBasicMaterial,
  LineSegments, LineBasicMaterial, EdgesGeometry, Group, Raycaster, Vector2
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Projectlist } from "./Projectlist";
import { useProjectStore } from "./Projectstore";

const boxGeo = new BoxGeometry(1, 1, 1);
const edgeGeo = new EdgesGeometry(boxGeo);
const lineMat = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
const hitMat = new MeshBasicMaterial({ visible: false });

export const Hero23d = () => {
  const setSelectedProject = useProjectStore((state) => state.setSelectedProject);  
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
    const spacing = 1;

    Projectlist.forEach((app, i) => {
      
      const hitBox = new Mesh(boxGeo, hitMat);
      const wireframe = new LineSegments(edgeGeo, lineMat);
      
      wireframe.raycast = () => null; 
      hitBox.add(wireframe);

      const x = i % 2;
      const y = Math.floor(i / 2) % 2;
      const z = Math.floor(i / 4) % 2;

      hitBox.position.set((x - 0.5) * spacing, (y - 0.5) * spacing, (z - 0.5) * spacing);
      hitBox.userData = { id: app.appid, title: app.title };
      group.add(hitBox);
    });

    scene.add(group);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

    const raycaster = new Raycaster();
    const mouse = new Vector2();

    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(group.children, false);

      if (intersects.length > 0) {
        const data = intersects[0].object.userData;
        setSelectedProject(data.id);
      }   

    };

    renderer.domElement.addEventListener("click", onClick);

    const sizeToHost = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
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
      group.rotation.y += 0.008;
      group.rotation.x += 0.004;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      observer.disconnect();
      renderer.domElement.removeEventListener("click", onClick);
      window.removeEventListener("resize", sizeToHost);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full relative" />;
};