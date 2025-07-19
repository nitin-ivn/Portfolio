import * as THREE from 'three';
import Door from './models/door';
import { DOOR } from './constants';

class RoomScene{

    constructor(){
        this.scene = new THREE.Scene();
        this.door1;
        this.door2;
        this.door3;
        this._setUpWalls();
        this._setUpFloor();
        this._setUpLights();
        this._setUpDoors();
    }

    _setUpWalls(){
        const boxGeometry = new THREE.PlaneGeometry(1,1);
        const boxMaterial = new THREE.MeshStandardMaterial({color: "#DC143C"});

        const topWall = new THREE.Mesh(boxGeometry,boxMaterial);
        topWall.scale.x = 20;
        topWall.scale.y = 3;

        const wallThickness = 0.2;
        const wallHeight = 5;
        const wallMaterial = new THREE.MeshStandardMaterial({ color: '#DC143C' });
        const wallLeft = new THREE.Mesh(
            new THREE.BoxGeometry(3, wallHeight, wallThickness),
            wallMaterial
        );
        wallLeft.position.set(-6.7, 0, -2.1);
        this.scene.add(wallLeft);


        const wallMidLeft = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, wallHeight, wallThickness),
            wallMaterial
        );
        wallMidLeft.position.set(-2.05, 0, -2.1);
        this.scene.add(wallMidLeft);

        const wallMidRight = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, wallHeight, wallThickness),
            wallMaterial
        );
        wallMidRight.position.set(1.95, 0, -2.1);
        this.scene.add(wallMidRight);

        const wallRight = new THREE.Mesh(
        new THREE.BoxGeometry(3, wallHeight, wallThickness),
            wallMaterial
        );
        wallRight.position.set(6.6, 0, -2.1);
        this.scene.add(wallRight);


        topWall.position.set(0,3.06,-2);

        this.scene.add(topWall);
    }

    _setUpFloor(){
        const floorGeometry = new THREE.BoxGeometry(15,5,1);
        const floorMaterial = new THREE.MeshStandardMaterial({color: "white"});

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -(Math.PI / 2);
        floor.position.y = -3;

        this.scene.add(floor);
    }

    _setUpLights(){
        const ceilingLight = new THREE.SpotLight(0xffffff,10);
        ceilingLight.position.set(0,3.4,0);
        ceilingLight.angle = Math.PI / 1.2;
        ceilingLight.penumbra = 0.4;
        ceilingLight.decay = 1.8;
        ceilingLight.distance = 10;
        ceilingLight.castShadow = true;

        ceilingLight.shadow.mapSize.set(1024,1024);
        ceilingLight.shadow.bias = -0.005;

        ceilingLight.target.position.set(0, 0, 0);

        this.scene.add(ceilingLight);
        this.scene.add(ceilingLight.target);
        this.scene.add(new THREE.AxesHelper(2));

        const ambient = new THREE.AmbientLight(0x222222);
        this.scene.add(ambient)
    }

    _setUpDoors(){
        const door1Class = new Door();
        door1Class.initializeDoor().then(() => {
            this.door1 = door1Class.getdoor();
            this.door1.position.set(DOOR.D1X,DOOR.DY,DOOR.DZ);

            if(this.door1){
                this.scene.add(this.door1);
                console.log(this.scene);
            }
        });

        const door2Class = new Door();
        door2Class.initializeDoor().then(() => {
            this.door2 = door2Class.getdoor();
            this.door2.position.set(DOOR.D2X,DOOR.DY,DOOR.DZ);
            
            if(this.door2){
                this.scene.add(this.door2);
                console.log(this.scene);
            }
        })

        const door3Class = new Door();
        door3Class.initializeDoor().then(() => {
            this.door3 = door3Class.getdoor();
            this.door3.position.set(DOOR.D3X,DOOR.DY,DOOR.DZ);
            
            // door3Class.openDoor();

            if(this.door3){
                this.scene.add(this.door3);
                console.log(this.scene);
            }
        });

        this.door1.userData = { type: 'personal-details' };
        this.door2.userData = { type: 'projects' };
        this.door3.userData = { type: 'achievements' };
    }

    getScene(){
        return this.scene;
    }
}

export default RoomScene;