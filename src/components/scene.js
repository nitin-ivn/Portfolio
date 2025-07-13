import * as THREE from 'three';

class RoomScene{

    constructor(){
        this.scene = new THREE.Scene();
        this._setUpWall();
        this._setUpFloor();
        this._setUpLights();
    }

    _setUpWall(){
        const boxGeometry = new THREE.BoxGeometry(15,7,1);
        const boxMaterial = new THREE.MeshStandardMaterial({color: "red"});

        const box = new THREE.Mesh(boxGeometry,boxMaterial);
        box.position.set(0,0,-2)
        this.scene.add(box);
    }

    _setUpFloor(){
        const floorGeometry = new THREE.BoxGeometry(15,5,1);
        const floorMaterial = new THREE.MeshStandardMaterial({color: "blue"});

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

    getScene(){
        return this.scene;
    }
}

export default RoomScene;