import { setupPointerControls } from "./Controls/pointerControls";
import { createRenderer } from "./renderer/renderer";
import { createCamera } from "./Scene/createCamera";
import { createScene } from "./Scene/createScene";
import * as THREE from 'three';

const canvas = document.querySelector(".canvas");

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer(canvas);

const controls = setupPointerControls(camera,document.body);
scene.add(controls.object);

let direction = new THREE.Vector3();
let velocity = new THREE.Vector3();
let prevTime = performance.now()

const renderLoop = () => {
    const time = performance.now();
    const delta = (time - prevTime) / 1000;


    if(controls.isLocked === true){
        direction.z = Number(controls.keys.forward) - Number(controls.keys.backward);
        direction.x = Number(controls.keys.right) - Number(controls.keys.left);
        direction.normalize();

        console.log(controls.keys);

        if(controls.keys.forward || controls.keys.backward){
            velocity.z = 0;
            velocity.z -= direction.z * 400.0 * delta;
            controls.moveForward(-velocity.z *  delta)
        }

        if(controls.keys.left || controls.keys.right){
            velocity.x = 0;
            velocity.x -= direction.x * 400.0 * delta;
            controls.moveRight(-velocity.x *  delta)
        }
        controls.object.position.y += ( velocity.y * delta );
    }

    prevTime = time;

    renderer.render(scene,camera);
    requestAnimationFrame(renderLoop);
}

renderLoop();