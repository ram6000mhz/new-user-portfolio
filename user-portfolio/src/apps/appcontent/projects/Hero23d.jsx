import { useRef, useEffect } from "react";
import { 
  WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, Mesh, MeshStandardMaterial,
  LineSegments, LineBasicMaterial, EdgesGeometry, Group, Raycaster, Vector2, 
  CanvasTexture, AmbientLight, DirectionalLight
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Projectlist } from "./Projectlist";
import { useProjectStore } from "./Projectstore";
import { render } from "preact"

const createIconTexture = (iconComponent) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#000000"; 
  ctx.fillRect(0, 0, 512, 512);

  const container = document.createElement("div");
  render(iconComponent, container);
  const svg = container.querySelector("svg");
  
  svg.setAttribute("width", "400");
  svg.setAttribute("height", "400");
  svg.setAttribute("stroke", "white");

  const svgData = new XMLSerializer().serializeToString(svg);
  render(null, container);
  const img = new Image();
  const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const texture = new CanvasTexture(canvas);

  img.onload = () => {
    ctx.drawImage(img, 56, 56, 400, 400);
    texture.needsUpdate = true;
    URL.revokeObjectURL(url);
  };
  img.src = url;

  return texture;
};

export const Hero23d = () => {
  const setSelectedProject = useProjectStore((state) => state.setSelectedProject);  
  const mountRef = useRef(null);

  useEffect(() => {
    const boxGeo = new BoxGeometry(1, 1, 1);
    const edgeGeo = new EdgesGeometry(boxGeo);
    const lineMat = new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });

    const container = mountRef.current;
    if (!container) return;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.set(0, 0, 4);

    const controls = new OrbitControls(camera, renderer.domElement);  
    Object.assign(controls, { 
      enableZoom: false, 
      autoRotate: true, 
      enablePan: false,
      enableDamping: true
    });

    controls.addEventListener('start', () => {
      controls.autoRotate = false;
    });

    controls.addEventListener('end', () => {
      controls.autoRotate = true;
    });
    
    const group = new Group();
    const spacing = 1;

    Projectlist.forEach((app, i) => {

      const iconTexture = createIconTexture(app.icon);
      const material = new MeshStandardMaterial({ 
        map: iconTexture,
        metalness: 0.5,
        roughness: 0.5 
      });

      const hitBox = new Mesh(boxGeo, material);
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

    const ambientLight = new AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

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
    const resizeObserver = new ResizeObserver(sizeToHost);
    resizeObserver.observe(container);
    sizeToHost();

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      if (controls.autoRotate) {
          group.rotation.x += 0.005;
          group.rotation.z += 0.003;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("resize", sizeToHost);
      renderer.domElement.removeEventListener("click", onClick);
      
      controls.dispose();

      group.traverse((child) => {
        if (child.isMesh) {
          const materials = Array.isArray(child.material) ? child.material : [child.material];
          materials.forEach(mat => {
            if (mat.map) {
              mat.map.dispose();
            }
            mat.dispose();
          });
        }
      });

      boxGeo.dispose();
      edgeGeo.dispose();
      lineMat.dispose();

      scene.clear();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full relative" />;
};