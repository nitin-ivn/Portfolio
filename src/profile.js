import * as THREE from 'three';
import CustomCamera from './components/camera';
import { SCENE } from './components/constants';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { WALLTEXTURE } from './components/textures';
import { ceil } from 'three/tsl';


const customCamera = new CustomCamera();
const camera = customCamera.createCamera();
camera.position.set(0,-0.3,3)
const scene = new THREE.Scene();


_setUpFloor();
_setUpWalls();
_setUpLights();

function _setUpFloor(){
    const floorGeometry = new THREE.BoxGeometry(18,5,1);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: SCENE.floorColor,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -(Math.PI / 2);
    floor.position.y = -3;

    floor.name = "floor"

    floor.layers.set(2);
    floor.receiveShadow = true;
    scene.add(floor);
}


function _setUpWalls(){
    const wallGeometry = new THREE.PlaneGeometry(18.5,10);
    const wallMaterial = new THREE.MeshStandardMaterial({color: "red"});

    const wall = new THREE.Mesh(wallGeometry,wallMaterial);
    wall.position.set(0,1,-2);
    scene.add(wall);
}

function _setUpLights(){
    const ambientLight = new THREE.AmbientLight(0x101010);
    scene.add(ambientLight);

    const hangingLight = new THREE.SpotLight(0xffffff,10);
    hangingLight.position.set(0,5,-1);
    hangingLight.target.position.set(0,0,-2);
    hangingLight.angle = Math.PI;
    hangingLight.penumbra = 0.6;
    hangingLight.intensity = 35;
    hangingLight.distance = 35;
    hangingLight.shadow.bias = -0.01;
    hangingLight.castShadow = true;

    hangingLight.shadow.mapSize.set(2048,2048);
    hangingLight.shadow.bias = -0.01;

    scene.add(hangingLight);
    scene.add(hangingLight.target);
}

const testCube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color: "red"}));
testCube.position.set(2,0,0);


export function startProfileLoop(renderer){
    const orbitControls = new OrbitControls(camera,renderer.domElement);
    renderer.setAnimationLoop(() => {
        renderer.render(scene,camera)
    })
}

export function stopProfileLoop(){
    console.log("Out profile");
}