import * as THREE from 'three'

export function createRenderer(canvas){
    const renderer = new THREE.WebGLRenderer({canvas})

    renderer.setSize(window.innerWidth,window.innerHeight);

    window.addEventListener('resize', () => {
    const camera = renderer.camera;
    if (camera) {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  return renderer;
}