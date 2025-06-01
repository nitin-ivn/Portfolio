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

    const speed = 4;


    if(controls.isLocked === true){
        direction.z = Number(controls.keys.forward) - Number(controls.keys.backward);
        direction.x = Number(controls.keys.right) - Number(controls.keys.left);
        direction.normalize();


        if(controls.keys.forward || controls.keys.backward){

            controls.moveForward(direction.z * speed *  delta)
        }

        if(controls.keys.left || controls.keys.right){
            controls.moveRight(direction.x * speed *  delta)
        }
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