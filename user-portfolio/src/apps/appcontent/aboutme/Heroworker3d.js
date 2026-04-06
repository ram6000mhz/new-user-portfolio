import { 
  WebGLRenderer, Scene, PerspectiveCamera, TorusGeometry, 
  LineSegments, LineBasicMaterial, EdgesGeometry 
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ElementProxyReceiver } from "../webworkerutil/ElementProxyReceiver";

const proxy = new ElementProxyReceiver();

let renderer, scene, camera, wireframe, frameId, controls;
let isInteracting = false;

self.onmessage = (e) => {
    const { type, data, canvas, width, height, pixelRatio } = e.data;

    if (type === 'init') {
      proxy.width = width;
      proxy.height = height;

      renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true });
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);

      scene = new Scene();
      camera = new PerspectiveCamera(75, width / height, 0.1, 100);
      camera.position.set(0, 3, 5);
      controls = new OrbitControls(camera, proxy);
      controls.enableDamping = true; 

      controls.addEventListener('start', () => {
        isInteracting = true;
      });

      controls.addEventListener('end', () => {
        isInteracting = false;
      });

      const geo = new TorusGeometry(2, 1, 15, 15);
      const edges = new EdgesGeometry(geo);
      wireframe = new LineSegments(edges, new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 }));
      scene.add(wireframe);

      render();
    }

    if (type === 'event') {
      proxy.dispatchEvent(data);
    }

    if (type === 'resize') {
      if (!renderer) return;
      if (renderer.domElement.width !== width || renderer.domElement.height !== height) {  
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      }
    }

    if (type === 'stop') {
      cancelAnimationFrame(frameId);
      scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    }
};

function render() {
    frameId = requestAnimationFrame(render);
    if (controls) {
        controls.update();
    }
    if (!isInteracting) {
        wireframe.rotation.x += 0.005;
        wireframe.rotation.z += 0.003;
    }
    renderer.render(scene, camera);
}