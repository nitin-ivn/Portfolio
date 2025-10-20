import * as THREE from 'three';
import CustomCamera from './components/camera';
import { SCENE } from './components/constants';
import { LuminosityHighPassShader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { POSTEXTURE, PWALLTEXTURE, repeatTextures, WALLTEXTURE} from './components/textures';
import { normalMap } from 'three/tsl';



const customCamera = new CustomCamera();
const camera = customCamera.createCamera();
camera.position.set(0,-0.3,3)
const scene = new THREE.Scene();


_setUpFloor();
_setUpWalls();
_setUpLights();
_setUpPoster();

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
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: PWALLTEXTURE.ALBEDO,
        roughnessMap: PWALLTEXTURE.ROUGHNESS,
        aoMap: PWALLTEXTURE.AO,
        //normalMap: PWALLTEXTURE.NORMAL,
        displacementMap: PWALLTEXTURE.HEIGHT,
        metallicMap: PWALLTEXTURE.METALLIC,
        roughness: 0.6,
        metalness: 0.0,
        clearcoat: 0.2,
        clearcoatRoughness: 0.1
    });

    const repeatArr =  [PWALLTEXTURE.ALBEDO, PWALLTEXTURE.METALLIC, PWALLTEXTURE.ROUGHNESS, PWALLTEXTURE.AO];
    repeatTextures(repeatArr,5,1);

    const wall = new THREE.Mesh(wallGeometry,wallMaterial);
    wall.castShadow = true;
    wall.position.set(0,1,-2);
    scene.add(wall);
}

function _setUpLights(){
    const ambientLight = new THREE.AmbientLight(0x101010, 10);
    scene.add(ambientLight);

    // const hangingLight = new THREE.SpotLight(0xffffff,10);
    // hangingLight.position.set(0,5,-1);
    // hangingLight.target.position.set(0,0,-2);
    // hangingLight.angle = Math.PI;
    // hangingLight.penumbra = 0.6;
    // hangingLight.intensity = 35;
    // hangingLight.distance = 35;
    // hangingLight.shadow.bias = -0.01;
    // hangingLight.castShadow = true;

    // hangingLight.shadow.mapSize.set(2048,2048);
    // hangingLight.shadow.bias = -0.01;

    // scene.add(hangingLight);
    // scene.add(hangingLight.target);

    const light = new THREE.SpotLight(0xFFFFFF, 75);
    light.penumbra = 0.1;
    light.decay = 2.7;
    light.angle = Math.PI / 10;

    light.position.set(0,-3,3);
    light.castShadow = true;
    light.target.position.set(-1,-1.5,-1.4);
    scene.add(light);
    scene.add(light.target);
}

function _setUpPoster(){
    const posterGeometry = new THREE.PlaneGeometry(4,5);
    const posterMaterial = new THREE.MeshStandardMaterial({
        map: POSTEXTURE,
        transparent: true,
        alphaTest: 0.45,      // removes fully-transparent pixels and helps with sorting
        roughness: 0.9,
        metalness: 0.0,
    });

    const poster = new THREE.Mesh(posterGeometry,posterMaterial);
    poster.position.set(0,0,-1.4);
    poster.castShadow = true;

    scene.add(poster);
}


export function startProfileLoop(renderer){
    const orbitControls = new OrbitControls(camera,renderer.domElement);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    renderer.setAnimationLoop(() => {
        renderer.render(scene,camera)
    })
}

export function stopProfileLoop(){
    console.log("Out profile");
}