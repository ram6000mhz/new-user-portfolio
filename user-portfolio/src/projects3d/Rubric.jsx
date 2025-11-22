import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export const Rubric = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const w = mountRef.current.clientWidth;
    const h = mountRef.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 10);
    camera.position.z = 2;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const geo = new THREE.IcosahedronGeometry(1.0, 1.0);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0066ff,
      flatShading: true,
      transparent: true,
      opacity: 1.0,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    const wireMesh = new THREE.Mesh(geo, wireMat);
    wireMesh.scale.setScalar(1.001);

    const mesh = new THREE.Mesh(geo, mat);
    mesh.add(wireMesh);
    scene.add(mesh);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xff0000);
    scene.add(hemiLight);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
};
