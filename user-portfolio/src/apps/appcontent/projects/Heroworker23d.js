import { 
  WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, Mesh, MeshStandardMaterial,
  LineSegments, LineBasicMaterial, EdgesGeometry, Group, Raycaster, Vector2, 
  AmbientLight, DirectionalLight, CanvasTexture
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ElementProxyReceiver } from "../webworkerutil/ElementProxyReceiver";

const proxy = new ElementProxyReceiver();
let renderer, scene, camera, controls, group, raycaster;
let frameId;
let isInteracting = false;
const mouse = new Vector2();

self.onmessage = (e) => {
    const { type, data, canvas, width, height, pixelRatio, projects } = e.data;

    if (type === 'init') {
      proxy.width = width;
      proxy.height = height;

      renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);

      scene = new Scene();
      camera = new PerspectiveCamera(75, width / height, 0.1, 100);
      camera.position.set(0, 0, 4);

      controls = new OrbitControls(camera, proxy);
      Object.assign(controls, { enableZoom: false, autoRotate: true, enableDamping: true });

      controls.addEventListener('start', () => { isInteracting = true; controls.autoRotate = false; });
      controls.addEventListener('end', () => { isInteracting = false; controls.autoRotate = true; });

      group = new Group();
      const boxGeo = new BoxGeometry(1, 1, 1);
      const edgeGeo = new EdgesGeometry(boxGeo);
      const lineMat = new LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });

      projects.forEach((app, i) => {
        const texture = new CanvasTexture(app.iconBitmap);
        
        const material = new MeshStandardMaterial({ 
          map: texture, 
          metalness: 0.4, 
          roughness: 0.6 
        });

        const hitBox = new Mesh(boxGeo, material);
        const wireframe = new LineSegments(edgeGeo, lineMat);
        wireframe.raycast = () => null; 
        hitBox.add(wireframe);

        const x = i % 2, y = Math.floor(i / 2) % 2, z = Math.floor(i / 4) % 2;
        hitBox.position.set((x - 0.5), (y - 0.5), (z - 0.5));
        hitBox.userData = { id: app.appid };
        group.add(hitBox);
      });

      scene.add(group);
      scene.add(new AmbientLight(0xffffff, 1.2));
      const dirLight = new DirectionalLight(0xffffff, 1.8);
      dirLight.position.set(5, 5, 5);
      scene.add(dirLight);

      raycaster = new Raycaster();
      renderLoop();
    }

    if (type === 'event') {
      proxy.dispatchEvent(data);
      
      if (data.type === 'pointerdown' || data.type === 'touchend') {
        mouse.x = (data.clientX / data.rectWidth) * 2 - 1;
        mouse.y = -(data.clientY / data.rectHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(group.children, false);
        if (intersects.length > 0) {
          self.postMessage({ type: 'PROJECT_SELECTED', id: intersects[0].object.userData.id });
        }
      }
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

      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            
            materials.forEach(mat => {
              if (mat.map) mat.map.dispose();
              if (mat.lightMap) mat.lightMap.dispose();
              if (mat.bumpMap) mat.bumpMap.dispose();
              if (mat.normalMap) mat.normalMap.dispose();
              
              mat.dispose();
            });
          }
        });
      }

      if (renderer) {
        renderer.dispose();
      }
      
      if (controls) {
        controls.dispose();
      }
      scene = null;
      camera = null;
      renderer = null;
      controls = null;
      group = null;
      raycaster = null;
    }
};

function renderLoop() {
  frameId = requestAnimationFrame(renderLoop);
  controls.update();
  if (!isInteracting && controls.autoRotate) {
    group.rotation.x += 0.005;
    group.rotation.z += 0.003;
  }
  renderer.render(scene, camera);
}