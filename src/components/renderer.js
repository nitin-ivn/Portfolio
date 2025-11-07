import * as THREE from 'three'
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';


let currentCamera = null;
let rendererInstance = null;
let css2RendererInstace = null;

export function createRenderer(canvas, cameraInstance){
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    currentCamera = cameraInstance;
    rendererInstance = renderer;

    window.addEventListener('resize', () => {
    if (currentCamera?.camera) {
      currentCamera.updateCameraOnResize();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return renderer;
}

export function createCSS2Renderer(canvas, cameraInstance){
  const labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0';
  labelRenderer.domElement.style.pointerEvents = 'none';
  labelRenderer.domElement.style.zIndex = '0';
  document.body.appendChild(labelRenderer.domElement);

  css2RendererInstace = labelRenderer;
  return labelRenderer;
}


export function updateRendererCamera(camera){
    currentCamera = camera;
}

