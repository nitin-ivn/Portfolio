import * as THREE from 'three';
import CustomCamera from './components/camera';
import { homePageTextures } from './components/textures';
import { createRenderer } from './components/renderer';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { DirectionalLight } from 'three/webgpu';

const canvas = document.getElementById("renderHomePage");

const customCamera = new CustomCamera();
const camera = customCamera.createCamera();


const scene = new THREE.Scene();
//scene.background = homePageTextures.backgroundCubeMap;

const testCube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color: "red"}));
testCube.position.set(2,0,0);

const testCube2 = testCube.clone();
testCube2.position.set(-2,0,-5);
scene.add(testCube2);

scene.add(testCube);

//const orbitControls = new OrbitControls(camera,canvas);

const renderer = createRenderer(canvas,camera);
let inHome = false;

let targetScroll = camera.position.z;

window.addEventListener("wheel", (e) => {
  if(inHome){
    targetScroll -= (e.deltaY * 1) / window.innerHeight; 
    camera.position.z = targetScroll;
    console.log(targetScroll);
  }
});

function setUpLights(){
    const ambient = new THREE.AmbientLight(0x101010);
    scene.add(ambient)

    const lights = new THREE.DirectionalLight(0xffffff,10);
    lights.castShadow = true;
    lights.position.set(0,0,0)
    lights.target.position.set(2,0,0);
    lights.lookAt(2,0,0);
    scene.add(lights);
}


export function startHomeLoop(){
    inHome = true;
    renderer.setAnimationLoop(() => {
        
        renderer.render(scene,camera);
        
    });
}


export function stopHomeLoop(){
    inHome = false;
    renderer.setAnimationLoop(null);
    
}
setUpLights();
startHomeLoop();


