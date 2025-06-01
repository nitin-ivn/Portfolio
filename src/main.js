import { setupPointerControls } from "./Controls/pointerControls";
import { createRenderer } from "./renderer/renderer";
import CustomCamera from "./Scene/createCamera";
import RoomScene from "./Scene/createScene";
import * as THREE from 'three';

const canvas = document.querySelector(".canvas");

const room = new RoomScene();
const customCamera = new CustomCamera();

const scene = room.createScene();
const camera = customCamera.createCamera();
const renderer = createRenderer(canvas);

const controls = setupPointerControls(camera,document.body);
scene.add(controls.object);

let direction = new THREE.Vector3();
let velocity = new THREE.Vector3();
let prevPosition = new THREE.Vector3();
let prevTime = performance.now()

const collisionObjects = [];
scene.children.forEach((box) => {
    if(box.isMesh){
        const box3 = new THREE.Box3().setFromObject(box);

        collisionObjects.push(box3);
    }
});

const renderLoop = () => {
    const time = performance.now();
    const delta = (time - prevTime) / 1000;

    prevPosition.copy(camera.position);


    if(controls.isLocked === true){
        direction.z = Number(controls.keys.forward) - Number(controls.keys.backward);
        direction.x = Number(controls.keys.right) - Number(controls.keys.left);
        direction.normalize();


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

    customCamera.updatePlayerBox();


    const collided = customCamera.checkCollisions(collisionObjects);

    if(collided){
        console.log(collided)
        camera.position.copy(prevPosition);
        customCamera.updatePlayerBox();
    }

    prevTime = time;

    renderer.render(scene,camera);
    requestAnimationFrame(renderLoop);
}

renderLoop();