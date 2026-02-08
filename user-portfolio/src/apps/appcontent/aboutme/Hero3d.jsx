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
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 100);
    camera.position.set(0, 3, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 4.0;
    controls.enablePan = false;

    const geo = new THREE.TorusGeometry(2, 1, 20, 30);
    const positions = geo.attributes.position;
    const count = positions.count;

    const dotGeo = new THREE.CircleGeometry(0.03, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const iMesh = new THREE.InstancedMesh(dotGeo, dotMat, count);
    
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(positions.getX(i), positions.getY(i), positions.getZ(i));
      const angle = Math.atan2(positions.getZ(i), positions.getX(i));
      dummy.lookAt(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
      dummy.updateMatrix();
      iMesh.setMatrixAt(i, dummy.matrix);
    }
    scene.add(iMesh);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);

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
      observer.disconnect();
      cancelAnimationFrame(frameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geo.dispose();
      dotGeo.dispose();
      dotMat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};