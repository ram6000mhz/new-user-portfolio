import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const Hero3d = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.set(0, 3, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4.0;
    controls.enablePan = false;

    const geo = new THREE.TorusGeometry(2, 1, 50, 50);
    const iMesh = new THREE.InstancedMesh(
      new THREE.SphereGeometry(0.03, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
      geo.attributes.position.count,
    );

    const dummy = new THREE.Object3D();
    for (let i = 0; i < geo.attributes.position.count; i++) {
      dummy.position.set(
        geo.attributes.position.getX(i),
        geo.attributes.position.getY(i),
        geo.attributes.position.getZ(i),
      );
      dummy.updateMatrix();
      iMesh.setMatrixAt(i, dummy.matrix);
    }
    scene.add(iMesh);

    const sizeToHost = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;

      renderer.setSize(w, h);

      camera.aspect = Math.max(w, 1) / Math.max(h, 1);
      camera.updateProjectionMatrix();

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    window.addEventListener("resize", sizeToHost, { passive: true });
    sizeToHost();

    let frameId;
    const animate = () => {
      iMesh.rotation.x += 0.01;
      iMesh.rotation.z += 0.005;
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", sizeToHost);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      geo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full relative overflow-hidden"/>;
};
