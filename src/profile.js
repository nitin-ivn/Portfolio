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

    const downLight = hangingLight.clone();
    downLight.position.set(0,-5.5,-1);
    scene.add(downLight);

    scene.add(hangingLight);
    scene.add(hangingLight.target);




    // const ldlight = new THREE.SpotLight(0xFFFFFF, 65);
    // ldlight.penumbra = 0.1;
    // ldlight.decay = 2.7;
    // ldlight.angle = Math.PI / 10;

    // ldlight.position.set(0,-3,3);
    // ldlight.castShadow = true;
    // ldlight.target.position.set(-1,-1.5,-1.4);

    // const ltlight = ldlight.clone();
    // ltlight.position.set(0,3,3);
    // ltlight.target.position.set(-1,1.5,-1.4);

    // const rt = ldlight.clone();
    // rt.position.set(0,3,3);
    // rt.target.position.set(1,1.5,-1.4);

    // const rb = ldlight.clone();
    // rb.position.set(0,3,3);
    // rb.target.position.set(1,-1.5,-1.4);

    // scene.add(rb);
    // scene.add(rb.target);


    // scene.add(ltlight);
    // scene.add(ltlight.target);
    
    // scene.add(rt);
    // scene.add(rt.target);


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
    let wantedHtml = document.createElement('div');
    wantedHtml.innerHTML = `
        <div class = "poster-container">
            <p class="poster-title">WANTED</p>
            <p style = "font-size: 1.3rem">Full Stack Developer</p>

            <div class="poster-img-container">
                <ig src="https://picsum.photos/400/400" />
            </div>
            <p style="margin-top: 5px; font-size: 2rem">I V N Sai Nitin</p>
            <hr style="border:0.005rem solid black; width: 20rem;">

            <p style = "font-size: 0.8rem; padding: 5px;">JAVA, React, Typescript, PostgreSQL</p>

            <div style="border: 1px solid black; padding: 10px">
                Reward: Quality Code and No AI bullshit
            </div>

            <div style = "margin-top: 10px; display: flex">
                <button class = "icon-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#211811" class="bi bi-github" viewBox="0 0 24 24">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                </button>

                <a class = "icon-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="#211811" class="bi bi-linkedin" viewBox="0 0 24 24">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                    </svg>
                </a>

                <a class = "icon-button">
                    <svg fill="#211811" width="30px" height="30px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.469 23.907l-3.595 3.473c-0.624 0.625-1.484 0.885-2.432 0.885s-1.807-0.26-2.432-0.885l-5.776-5.812c-0.62-0.625-0.937-1.537-0.937-2.485 0-0.952 0.317-1.812 0.937-2.432l5.76-5.844c0.62-0.619 1.5-0.859 2.448-0.859s1.808 0.26 2.432 0.885l3.595 3.473c0.687 0.688 1.823 0.663 2.536-0.052 0.708-0.713 0.735-1.848 0.047-2.536l-3.473-3.511c-0.901-0.891-2.032-1.505-3.261-1.787l3.287-3.333c0.688-0.687 0.667-1.823-0.047-2.536s-1.849-0.735-2.536-0.052l-13.469 13.469c-1.307 1.312-1.989 3.113-1.989 5.113 0 1.996 0.683 3.86 1.989 5.168l5.797 5.812c1.307 1.307 3.115 1.937 5.115 1.937 1.995 0 3.801-0.683 5.109-1.989l3.479-3.521c0.688-0.683 0.661-1.817-0.052-2.531s-1.849-0.74-2.531-0.052zM27.749 17.349h-13.531c-0.932 0-1.692 0.801-1.692 1.791 0 0.991 0.76 1.797 1.692 1.797h13.531c0.933 0 1.693-0.807 1.693-1.797 0-0.989-0.76-1.791-1.693-1.791z"/>
                    </svg>
                </a>
            </div>
            
        </div>  
    `;
    wantedHtml.style.pointerEvents = 'auto';
    const wantedObject = new CSS2DObject(wantedHtml);
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