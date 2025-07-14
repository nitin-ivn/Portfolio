import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { loadModel } from "./loader";

export default class Door{
    constructor(){
        this.url = '/models/door.glb';
        this.door;
        
    }

    async initializeDoor(){
        this.door = await loadModel(this.url);
        this.correctDoorRotation();
        console.log(this.door);
    }

    correctDoorRotation(){
        this.door.rotation.y = Math.PI;
        this.door.scale.set(2.5,2,1);
    }

    openDoor(){
        this.door.children.forEach((child) => {
            if(child.isMesh){
                child.rotation.y = Math.PI / 2;
            }
        })
    }

    getdoor(){
        return this.door;
    }
}

