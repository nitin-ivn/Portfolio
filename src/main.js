import * as THREE from 'three';
import RoomScene from './components/scene';
import CustomCamera from './components/camera';
import { createRenderer } from './components/renderer';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { DOOR } from './components/constants';
import { startProjectsLoop, stopProjectsLoop } from './projects';
import { startProfileLoop, stopProfileLoop } from './profile';


const canvas = document.getElementById("renderArea");
const backBtn = document.querySelector(".back-btn");

function stopAllLoops(){
    // stopProjectsLoop();
    // stopProfileLoop();
    stopLoop();
}

function showPage(doorKey){
    console.log(doorKey);
    stopAllLoops();

    stopLoop();
    if(doorKey == "door1"){
        startProfileLoop(renderer);
    }else if(doorKey == "door2"){
        startProjectsLoop(renderer);
    }else{

    }
    backBtn.style.display = "block";
        //doorPages[doorKey].style.display = 'block';
    //document.body.style.overflow = "auto";
    //document.body.style.overflowInline = "hidden"
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

backBtn.addEventListener('click', () => {
        stopAllLoops();
        startLoop();
        //document.body.style.overflow = "hidden";
        backBtn.style.display = "none";
        
        customCamera.doorClosed();
});

const door1 = room.getDoor1();
const door2 = room.getDoor2();
const door3 = room.getDoor3();

let INTERSECTED;
let clicked = false;

//const orbitControls = new OrbitControls(camera,canvas);

const renderer = createRenderer(canvas, customCamera);

const hoveredDoors = {
    door1: false,
    door2: false,
    door3: false
};

function onClick(){
    clicked = true;
}
const clickableObjects = [door1.doorMesh, door2.doorMesh, door3.doorMesh];

function startLoop(){
    //startProfileLoop(renderer)
    renderer.setAnimationLoop(() => {
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
    });
}

function stopLoop(){
    renderer.setAnimationLoop(null);
}


window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onClick);
startLoop();