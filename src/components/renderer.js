import * as THREE from 'three'


let currentCamera = null;
let rendererInstance = null;

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

export function updateRendererCamera(camera){
    currentCamera = camera;
}

