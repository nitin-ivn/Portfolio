import * as THREE from 'three'

export function createRenderer(canvas, cameraInstance){
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })

    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    window.addEventListener('resize', () => {
    if (cameraInstance?.camera) {
      cameraInstance.updateCameraOnResize();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return renderer;
}