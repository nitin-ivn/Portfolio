import * as THREE from 'three';
import RoomScene from './components/scene';
import CustomCamera from './components/camera';
import { createRenderer } from './components/renderer';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { or } from 'three/tsl';

const canvas = document.getElementById("renderArea");

const room = new RoomScene();
const customCamera = new CustomCamera();

const scene = room.getScene();
const camera = customCamera.createCamera();

console.log(scene);
console.log(camera)

const orbitControls = new OrbitControls(camera,canvas);
scene.add(orbitControls);

const renderer = createRenderer(canvas, customCamera);

const renderLoop = () => {
    console.log(window.innerWidth / window.innerHeight);
    renderer.render(scene,camera);
    requestAnimationFrame(renderLoop);
}

renderLoop();
