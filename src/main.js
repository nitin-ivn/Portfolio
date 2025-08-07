import * as THREE from 'three';
import RoomScene from './components/scene';
import CustomCamera from './components/camera';
import { createRenderer } from './components/renderer';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { or } from 'three/tsl';
import { DOOR } from './components/constants';


const canvas = document.getElementById("renderArea");

const doorPages = {
    door1: document.getElementById("door1Page"),
    door2: document.getElementById("door2Page"),
    door3: document.getElementById("door3Page")
}

function showPage(doorKey){
    console.log(doorKey);
    for(const key in doorPages){
        doorPages[key].style.display = 'none';
    }

    if(doorPages[doorKey]){
        doorPages[doorKey].style.display = 'block';
    }
}
const room = new RoomScene();
const customCamera = new CustomCamera();

const raycaster = new THREE.Raycaster();
raycaster.layers.set(0);
const pointer = new THREE.Vector2(-100, -100);

function onPointerMove(event){
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

const scene = room.getScene();
const camera = customCamera.createCamera();

document.querySelectorAll(".back-btn").forEach((back) => {
    back.addEventListener('click', () => {
        for(const key in doorPages){
            doorPages[key].style.display = 'none';
        }
        customCamera.doorClosed();
    });
})

const door1 = room.getDoor1();
const door2 = room.getDoor2();
const door3 = room.getDoor3();

let INTERSECTED;
let clicked = false;

const orbitControls = new OrbitControls(camera,canvas);

const renderer = createRenderer(canvas, customCamera);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const hoveredDoors = {
    door1: false,
    door2: false,
    door3: false
};

function onClick(){
    clicked = true;
}
const clickableObjects = [door1.doorMesh, door2.doorMesh, door3.doorMesh];

const renderLoop = () => {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(clickableObjects);

    const currentHovered = {
        door1: false,
        door2: false,
        door3: false
    };

    for (let i = 0; i < intersects.length; i++) {
        const name = intersects[i].object.userData.doorName;
        if (name === DOOR.door1) currentHovered.door1 = true;
        if (name === DOOR.door2) currentHovered.door2 = true;
        if (name === DOOR.door3) currentHovered.door3 = true;

    }

    //if(intersects.length > 0) console.log(intersects);

    for (const key of ['door1', 'door2', 'door3']) {
        const wasHovered = hoveredDoors[key];
        const isHovered = currentHovered[key];

        if (!wasHovered && isHovered) {
            if (key === 'door1') door1.openDoor();
            if (key === 'door2') door2.openDoor();
            if (key === 'door3') door3.openDoor();
        } else if (wasHovered && !isHovered) {
            if (key === 'door1') door1.closeDoor();
            if (key === 'door2') door2.closeDoor();
            if (key === 'door3') door3.closeDoor();
        }

        hoveredDoors[key] = isHovered;
    }

    if(clicked){
        console.log("clicked");

        if(intersects.length > 0){
            const name = intersects[0].object.userData.doorName;
            let door;
            if (name === DOOR.door1) door = door1;
            if (name === DOOR.door2) door = door2;
            if (name === DOOR.door3) door = door3;

            door.doorClicked();
            canvas.style.cursor = 'none';
            customCamera.doorOpened(door.doorGroup).then(() => {
                showPage(name);
                canvas.style.cursor = 'auto';
            });
        }
        clicked = false;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(renderLoop);
};



window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onClick);
renderLoop();
