import * as THREE from 'three';
import CustomCamera from './components/camera';
import { SCENE } from './components/constants';
import { CSS2DObject, LuminosityHighPassShader, OrbitControls } from 'three/examples/jsm/Addons.js';
import { POSTEXTURE, PWALLTEXTURE, repeatTextures, WALLTEXTURE} from './components/textures';

let poster;

const customCamera = new CustomCamera();
const camera = customCamera.createCamera();
camera.position.set(0,0,3)
const scene = new THREE.Scene();


_setUpFloor();
_setUpPoster();
_setUpWalls();


function _setUpFloor(){
    const floorGeometry = new THREE.BoxGeometry(18,5,1);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: SCENE.floorColor,
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -(Math.PI / 2);
    floor.position.y = -4;

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
        metalnessMap: PWALLTEXTURE.METALLIC,
        roughness: 0.6,
        metalness: 0.0,
        clearcoatRoughness: 0.1
    });

    const repeatArr =  [PWALLTEXTURE.ALBEDO, PWALLTEXTURE.METALLIC, PWALLTEXTURE.ROUGHNESS, PWALLTEXTURE.AO];
    repeatTextures(repeatArr,5,1);

    const wall = new THREE.Mesh(wallGeometry,wallMaterial);
    wall.receiveShadow = true;
    wall.position.set(0,0,-2);
    scene.add(wall);
}

function _setUpLights() {
    const ambientLight = new THREE.AmbientLight(0x101010, 15);
    scene.add(ambientLight);

    const hangingLight = new THREE.SpotLight(0xffffff, 50);
    hangingLight.position.set(0, 4.5, -1);
    hangingLight.target.position.set(0, 0, -1.4);
    hangingLight.angle = Math.PI / 5;
    hangingLight.penumbra = 0.3;
    hangingLight.decay = 2.0;
    hangingLight.distance = 25;

    hangingLight.castShadow = true;
    hangingLight.shadow.mapSize.set(4096, 4096);
    hangingLight.shadow.bias = -0.0001;
    hangingLight.shadow.normalBias = 0.02;

    scene.add(hangingLight);
    scene.add(hangingLight.target);




    //const ldlight = new THREE.SpotLight(0xFFFFFF, 65);
    // ldlight.penumbra = 0.1;
    // ldlight.decay = 2.7;
    // ldlight.angle = Math.PI / 10;

    // ldlight.position.set(0,-3,3);
    // ldlight.castShadow = true;
    // ldlight.target.position.set(-1,-1.5,-1.4);

    // const ltlight = ldlight.clone();
    // ltlight.position.set(0,3,3);
    // ltlight.target.position.set(-1,1.5,-1.4);

    // scene.add(ltlight);
    // scene.add(ltlight.target);


    // scene.add(ldlight);
    // scene.add(ldlight.target);
}


function _setUpPoster(){
    const posterGeometry = new THREE.BoxGeometry(5,5.5,0.05);
    const posterMaterial = new THREE.MeshStandardMaterial({
        map: POSTEXTURE,
        transparent: true,
        //alphaTest: 0.45,
        roughness: 0.6,
        metalness: 0.0,
    });

    

    poster = new THREE.Mesh(posterGeometry,posterMaterial);
    poster.position.set(0,0,-1.4);
    poster.castShadow = true;


    //poster HTML
    let wantedLabel = document.createElement('label');
    wantedLabel.innerHTML = 'WANTED';
    const wantedObject = new CSS2DObject(wantedLabel);
    wantedObject.position.set(0,0,0);
    poster.add(wantedObject);

    scene.add(poster);
    
_setUpLights();
}


export function startProfileLoop(renderer, labelRenderer){
    const orbitControls = new OrbitControls(camera,renderer.domElement);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // smoother shadow edges


    renderer.setAnimationLoop(() => {
        renderer.render(scene,camera)
        labelRenderer.render(scene,camera);
    })
}

export function stopProfileLoop(){
    console.log("Out profile");
}