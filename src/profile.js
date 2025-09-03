import * as THREE from 'three';
import CustomCamera from './components/camera';
import { SCENE } from './components/constants';
import { OrbitControls } from 'three/examples/jsm/Addons.js';


const customCamera = new CustomCamera();
const camera = customCamera.createCamera();
const scene = new THREE.Scene();


_setUpFloor();

function _setUpFloor(){
        const floorGeometry = new THREE.BoxGeometry(18,5,1);
        const floorMaterial = new THREE.MeshBasicMaterial({
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

const testCube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color: "red"}));
testCube.position.set(2,0,0);

const testCube2 = testCube.clone();
testCube2.position.set(-2,0,-5);
scene.add(testCube2);

scene.add(testCube);


export function startProfileLoop(renderer){
    const orbitControls = new OrbitControls(camera,renderer.domElement);
    renderer.setAnimationLoop(() => {
        renderer.render(scene,camera)
    })
}

export function stopProfileLoop(){
    console.log("Out profile");
}