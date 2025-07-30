import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { loadModel } from "./loader";
import * as THREE from 'three';
import gsap from "gsap";


export default class Door{
    constructor(){
        this.url = '/models/door.glb';
        this.doorFrame;
        this.doorHandle;

        this.doorGroup = new THREE.Group();
        this.doorMesh;
        this.pivotGroup = new THREE.Group();

        this.door;
        
    }

    async initializeDoor(){
        this.door = await loadModel(this.url);

        this.doorFrame = this.door.getObjectByName("Cube012");
        this.doorHandle = this.door.getObjectByName("Cube");

        const boxGeometry = new THREE.BoxGeometry(0.8,2,0.1);
        this.doorMesh = new THREE.Mesh(boxGeometry,new THREE.MeshStandardMaterial({color: 0xffffff}));

        this.pivotGroup.position.set(-0.4, 0, 0);
        this.doorMesh.position.set(0.4,1,-0.1);

        this.pivotGroup.add(this.doorMesh)

        this.doorFrame.rotation.y = Math.PI / 1;
        this.doorHandle.rotation.y = Math.PI;

        this.doorHandle.position.set(0.73, 1, -0.05);
this.pivotGroup.add(this.doorHandle);
        this.doorFrame.position.set(0,1.2,0);

        this.doorGroup.add(this.doorFrame);
        this.doorGroup.add(this.pivotGroup);

        
        this.correctDoorRotation();
    }

    correctDoorRotation(){
        this.doorGroup.scale.set(2.5,2,1);
    }

    openDoor(){
        if(this.pivotGroup){
            gsap.killTweensOf(this.pivotGroup.rotation);
            gsap.to(this.pivotGroup.rotation, {
                y: Math.PI / 4,
                duration: 2,
                ease: "power2.out"
            });
        }
    }

    closeDoor(){
        if(this.pivotGroup){
            gsap.killTweensOf(this.pivotGroup.rotation);
            gsap.to(this.pivotGroup.rotation, {
                y: 0,
                duration: 2,
                ease: "power2.out"
            });
        }
    }


    getdoor(){
        return this.doorGroup;
    }

    assignDoorName(doorName){
        this.doorMesh.name = doorName;
    }
}

