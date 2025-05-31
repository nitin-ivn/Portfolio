import * as THREE from 'three'

class RoomScene{
    
    constructor(){
        this.scene = new THREE.Scene();
        this.setUpFloor();
        this.setUpLights();
        this.setUpWalls();
        
    }

    setUpFloor(){
        const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(1,1,1,1),
        new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            side: THREE.DoubleSide
        })
        )
        floor.scale.x = 6;
        floor.scale.y = 8;
        floor.castShadow = false;
        floor.receiveShadow = true;
        floor.rotation.x = -(Math.PI / 2);
        this.scene.add(floor);
    }

    setUpWalls(){
        const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const backWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), wallMaterial);
        backWall.position.set(0, 2, 4);
        backWall.rotation.y = Math.PI
        this.scene.add(backWall);
    }

    setUpLights(){
        const light = new THREE.DirectionalLight(0xFFFFFF);
        light.position.set(100,100,100);
        light.target.position.set(0,0,0)
        light.castShadow = true;
        light.shadow.bias = -0.01;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 300;

        this.scene.add(light);
        this.scene.add(new THREE.AxesHelper(2));

        const ambient = new THREE.AmbientLight(0x404040);
        this.scene.add(ambient)
    }
    
    
    createScene(){
        const cube = this.testShape();
        cube.position.y = 0.5;
        this.scene.add(cube);

        return this.scene;
    }

    testShape(){

        const cubeM = new THREE.MeshStandardMaterial({color: 'red'});
        const cubeG = new THREE.BoxGeometry(1,1,1);

        const cube = new THREE.Mesh(cubeG,cubeM);

        return cube;
    }
}

export default RoomScene;