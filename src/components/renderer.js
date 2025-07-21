import * as THREE from 'three'

export function createRenderer(canvas, cameraInstance){
    const renderer = new THREE.WebGLRenderer({canvas})

    renderer.setSize(window.innerWidth,window.innerHeight);

    window.addEventListener('resize', () => {
    if (cameraInstance?.camera) {
      cameraInstance.updateCameraOnResize();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return renderer;
}