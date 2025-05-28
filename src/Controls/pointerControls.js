
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';


export function setupPointerControls(camera, domElement) {
  const controls = new PointerLockControls(camera, domElement);

  const keys = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };

  document.addEventListener('click', () => controls.lock());

  document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'KeyW': keys.forward = true; break;
      case 'KeyS': keys.backward = true; break;
      case 'KeyA': keys.left = true; break;
      case 'KeyD': keys.right = true; break;
    }
  });

  document.addEventListener('keyup', (event) => {
    switch (event.code) {
      case 'KeyW': keys.forward = false; break;
      case 'KeyS': keys.backward = false; break;
      case 'KeyA': keys.left = false; break;
      case 'KeyD': keys.right = false; break;
    }
  });

  controls.keys = keys;
  return controls;
}
