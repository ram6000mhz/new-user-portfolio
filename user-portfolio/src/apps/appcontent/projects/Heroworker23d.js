import { 
  WebGLRenderer, Scene, PerspectiveCamera, BoxGeometry, Mesh, MeshStandardMaterial,
  LineSegments, LineBasicMaterial, EdgesGeometry, Group, Raycaster, Vector2, 
  AmbientLight, DirectionalLight, EventDispatcher
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
        const lineMat = new LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 1 });

        projects.forEach((app, i) => {
        const material = new MeshStandardMaterial({ color: app.boxcolor, metalness: 0.5, roughness: 0.5 });
        const hitBox = new Mesh(boxGeo, material);
        const wireframe = new LineSegments(edgeGeo, lineMat);
        
        wireframe.raycast = () => null; 
        hitBox.add(wireframe);

        const x = i % 2, y = Math.floor(i / 2) % 2, z = Math.floor(i / 4) % 2;
        hitBox.position.set((x - 0.5), (y - 0.5), (z - 0.5));
        hitBox.userData = { id: app.appid };
        group.add(hitBox);
        });

        scene.add(group, new AmbientLight(0xffffff, 1.5), new DirectionalLight(0xffffff, 2));
        raycaster = new Raycaster();
        
        renderLoop();
    }

    if (type === 'event') {
        proxy.dispatchEvent(data);
        
        if (data.type === 'pointerdown') {
        mouse.x = (data.clientX / proxy.width) * 2 - 1;
        mouse.y = -(data.clientY / proxy.height) * 2 + 1;
        
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(group.children, false);
        if (intersects.length > 0) {
            self.postMessage({ type: 'PROJECT_SELECTED', id: intersects[0].object.userData.id });
        }
        }
    }

    if (type === 'resize') {
      if (renderer.domElement.width !== width || renderer.domElement.height !== height) {  
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height, false);
        renderer.render(scene, camera);
      }
    }

    if (type === 'stop') {
        cancelAnimationFrame(frameId);
        scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) Array.isArray(obj.material) ? obj.material.forEach(m => m.dispose()) : obj.material.dispose();
        });
        renderer.dispose();
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