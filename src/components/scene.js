import * as THREE from 'three';
import Door from './models/door';
import { DOOR, SCENE } from './constants';
import { repeatTextures, WALLTEXTURE } from './textures';

class RoomScene{

    constructor(){
        this.scene = new THREE.Scene();
        this.door1;
        this.door2;
        this.door3;
        this.door1Class;
        this.door2Class;
        this.door3Class;
        this._setUpWalls();
        this._setUpFloor();
        this._setUpLights();
        this._setUpDoors();
    }

    _setUpWalls(){
        const wallThickness = 0.2;
        const wallHeight = 4.15;

        const boxGeometry = new THREE.PlaneGeometry(18.5,7);
        const topWallMaterial = new THREE.MeshStandardMaterial({
            color: SCENE.wallColor,
            map: WALLTEXTURE.ALBEDO.clone(),
            aoMap: WALLTEXTURE.AO.clone(),
            metalnessMap: WALLTEXTURE.METALLIC.clone(),
            roughnessMap: WALLTEXTURE.ROUGHNESS.clone(),
        });

        const wallMaterial = new THREE.MeshStandardMaterial({ 
            color: SCENE.wallColor,
            map: WALLTEXTURE.ALBEDO,
            aoMap: WALLTEXTURE.AO,
            metalnessMap: WALLTEXTURE.METALLIC,
            roughnessMap: WALLTEXTURE.ROUGHNESS,
        });

        const topWall = new THREE.Mesh(boxGeometry,topWallMaterial);
        topWall.material.map.repeat.set(18,7)
        topWall.material.map.wrapS = THREE.RepeatWrapping;
        topWall.material.map.wrapT = THREE.RepeatWrapping;
        topWall.material.map.needsUpdate = true;
        topWall.position.set(0,5.06,-2);



        const repeatArr =  [WALLTEXTURE.ALBEDO, WALLTEXTURE.METALLIC, WALLTEXTURE.ROUGHNESS, WALLTEXTURE.AO];
        repeatTextures(repeatArr,3,4);


        const wallLeft = new THREE.Mesh(
            new THREE.BoxGeometry(4, wallHeight, wallThickness),
            wallMaterial
        );
        wallLeft.position.set(-7.2, -0.5, -2.1);
        this.scene.add(wallLeft);


        const wallMidLeft = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, wallHeight, wallThickness),
            wallMaterial
        );
        wallMidLeft.position.set(-2.05, -0.5, -2.1);
        this.scene.add(wallMidLeft);

        const wallMidRight = new THREE.Mesh(
        new THREE.BoxGeometry(1.7, wallHeight, wallThickness),
            wallMaterial
        );
        wallMidRight.position.set(1.95, -0.5, -2.1);
        this.scene.add(wallMidRight);

        const wallRight = new THREE.Mesh(
        new THREE.BoxGeometry(3, wallHeight, wallThickness),
            wallMaterial
        );
        wallRight.position.set(6.6, -0.5, -2.1);
        this.scene.add(wallRight);
        
        topWall.layers.set(2);
        wallLeft.layers.set(2);
        wallRight.layers.set(2);
        wallMidLeft.layers.set(2);
        wallMidRight.layers.set(2);
        this.scene.add(topWall);
    }

    _setUpFloor(){
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
        this.scene.add(floor);
    }

    _setUpLights(){
        const ambient = new THREE.AmbientLight(0x101010);
        this.scene.add(ambient)

        const lights = [
            { x: -4.05, targetX: -4.1, name: 'door1' },
            { x: 0, targetX: 0, name: 'door2' }, 
            { x: 3.95, targetX: 4.1, name: 'door3' }
        ]

        lights.forEach((child) => {
            const ceilingLight = new THREE.SpotLight(0xffffff,10);
            ceilingLight.position.set(child.x, 4.5, -1);
            ceilingLight.target.position.set(child.x, 0, -2);
            ceilingLight.angle = Math.PI / 6;
            ceilingLight.penumbra = 0.6;
            ceilingLight.intensity = 20;
            ceilingLight.decay = 2;
            ceilingLight.distance = 15;
            ceilingLight.shadow.bias = -0.01;
            ceilingLight.castShadow = true;


            ceilingLight.shadow.mapSize.set(2048,1024);
            ceilingLight.shadow.bias = -0.01;

            this.scene.add(ceilingLight);
            this.scene.add(ceilingLight.target);
            
        })

        // const ceilingLight = new THREE.SpotLight(0xffffff,10);
        // ceilingLight.position.set(0, 4, -1);
        // ceilingLight.target.position.set(0, 0, -2);
        // ceilingLight.angle = Math.PI / 6;
        // ceilingLight.penumbra = 0.6;
        // ceilingLight.intensity = 20;
        // ceilingLight.decay = 2;
        // ceilingLight.distance = 15;
        // ceilingLight.shadow.bias = -0.01;
        // ceilingLight.castShadow = true;


        // ceilingLight.shadow.mapSize.set(1024,1024);
        // ceilingLight.shadow.bias = -0.01;

        // this.scene.add(ceilingLight);
        // this.scene.add(ceilingLight.target);
    }

    _setUpDoors(){
        this.door1Class = new Door();
        this.door1Class.initializeDoor().then(() => {
            this.door1 = this.door1Class.getdoor();
            this.door1.position.set(DOOR.D1X,DOOR.DY,DOOR.DZ);

            this.door1Class.assignDoorName(DOOR.door1);

            if(this.door1){
                this.scene.add(this.door1);
            }
        });

        this.door2Class = new Door();
        this.door2Class.initializeDoor().then(() => {
            this.door2 = this.door2Class.getdoor();
            this.door2.position.set(DOOR.D2X,DOOR.DY,DOOR.DZ);
            
            this.door2Class.assignDoorName(DOOR.door2);

            if(this.door2){
                this.scene.add(this.door2);
            }
        })

        this.door3Class = new Door();
        this.door3Class.initializeDoor().then(() => {
            this.door3 = this.door3Class.getdoor();
            this.door3.position.set(DOOR.D3X,DOOR.DY,DOOR.DZ);
            
            this.door3Class.assignDoorName(DOOR.door3);

            if(this.door3){
                this.door1.castShadow = true;
                this.door2.castShadow = true;
                this.door3.castShadow = true;
                this.scene.add(this.door3);
            }
        });

    }

    getScene(){
        return this.scene;
    }

    getDoor1(){
        return this.door1Class;
    }

    getDoor2(){
        return this.door2Class;
    }
    
    getDoor3(){
        return this.door3Class;
    }

    
}

export default RoomScene;