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
scene.fog = new THREE.FogExp2(0x0000000, 0.15);
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
    targetScroll -= (e.deltaY * 1.5) / window.innerHeight; 
    camera.position.z = targetScroll;
    console.log(targetScroll);
  }
});

let lightCone; 

function setUpTorch(){
    const ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    const torchLight = new THREE.SpotLight(0xffffff, 10, 20, Math.PI / 6, 0.5, 2);
    torchLight.castShadow = true;

    const lightTarget = new THREE.Object3D();
    scene.add(lightTarget);

    torchLight.target = lightTarget;
    scene.add(torchLight);

    const coneGeometry = new THREE.ConeGeometry(0.5, 2, 32, 1, true);
    const coneMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.25,
        depthWrite: false,
        side: THREE.DoubleSide,
    });
    lightCone = new THREE.Mesh(coneGeometry, coneMaterial);
    torchLight.add(lightCone);
    lightCone.position.set(0.5, 0, -0.5);
    return { torchLight, lightTarget };
}

const {torchLight,lightTarget} = setUpTorch();


function updateTorch(){
    const offset = new THREE.Vector3(0, -0.3, -0.5);
    offset.applyQuaternion(camera.quaternion);
    torchLight.position.copy(camera.position).add(offset);

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    const forwardTarget = camera.position.clone().add(forward.multiplyScalar(10));

    const dist1 = camera.position.distanceTo(testCube.position);
    const dist2 = camera.position.distanceTo(testCube2.position);

    let targetCube = null;

    const camToCube1 = testCube.position.clone().sub(camera.position).normalize();
    const camToCube2 = testCube2.position.clone().sub(camera.position).normalize();

    const dot1 = forward.dot(camToCube1);
    const dot2 = forward.dot(camToCube2);

    if (dot1 > 0 && (dist1 < dist2 || dot2 <= 0)) {
        targetCube = testCube;
    } else if (dot2 > 0) {
        targetCube = testCube2;
    }

    const desiredTarget = targetCube ? targetCube.position : forwardTarget;

    lightTarget.position.lerp(desiredTarget, 0.08);

    const torchDirection = new THREE.Vector3().subVectors(lightTarget.position, torchLight.position).normalize();

    const quat = new THREE.Quaternion();
    quat.setFromUnitVectors(new THREE.Vector3(0, -1, 0), torchDirection);
    lightCone.setRotationFromQuaternion(quat);
}



scene.add(camera);



export function startHomeLoop(){
    inHome = true;
    renderer.setAnimationLoop(() => {
        updateTorch();
        renderer.render(scene,camera);
        
    });
}


export function stopHomeLoop(){
    inHome = false;
    renderer.setAnimationLoop(null);
    
}
startHomeLoop();


