import * as THREE from 'three'
import { ROOM } from '../constants';
import { CEILINGTEXTURE, FLOORTEXTURE, repeatTextures, WALLTEXTURE } from '../textures';

class RoomScene{
    
    constructor(){
        this.scene = new THREE.Scene();
        this.setUpFloor();
        this.setUpLights();
        this.setUpWalls();
        this.setUpCeiling();
        
    }

    setUpFloor(){
        const floorGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        floorGeometry.attributes.uv2 = floorGeometry.attributes.uv;

        const floorMaterial = new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            map: FLOORTEXTURE.ALBEDO,
            metalnessMap: FLOORTEXTURE.METALLIC,
            roughnessMap: FLOORTEXTURE.ROUGHNESS,
            aoMap: FLOORTEXTURE.AO,
        });

        const floor = new THREE.Mesh(floorGeometry, floorMaterial);

        const repeatArr =  [FLOORTEXTURE.ALBEDO, FLOORTEXTURE.METALLIC, FLOORTEXTURE.ROUGHNESS, FLOORTEXTURE.AO];
        repeatTextures(repeatArr);
    

        floor.scale.x = ROOM.SIDE;
        floor.scale.y = ROOM.SIDE;
        floor.castShadow = false;
        floor.receiveShadow = true;
        floor.rotation.x = -(Math.PI / 2);
        this.scene.add(floor);
    }

    setUpCeiling(){
        const ceilGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        ceilGeometry.setAttribute(
        'uv2',
        new THREE.BufferAttribute(ceilGeometry.attributes.uv.array, 2)
        );

        const ceilMaterial = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            // map: CEILINGTEXTURE.ALBEDO,
            // metalnessMap: CEILINGTEXTURE.METALLIC,
            // roughnessMap: CEILINGTEXTURE.ROUGHNESS,
            // aoMap: CEILINGTEXTURE.AO,
        });

        const ceil = new THREE.Mesh(ceilGeometry, ceilMaterial);

        const repeatArr =  [CEILINGTEXTURE.ALBEDO, CEILINGTEXTURE.METALLIC, CEILINGTEXTURE.ROUGHNESS, CEILINGTEXTURE.AO];
        repeatTextures(repeatArr);

        

        ceil.scale.x = ROOM.SIDE;
        ceil.scale.y = ROOM.SIDE;
        ceil.castShadow = true;
        ceil.rotation.x = (Math.PI / 2);
        ceil.position.y = 3.5;
        this.scene.add(ceil);
    }

    setUpWalls(){
        const wallGeometry = new THREE.PlaneGeometry(ROOM.SIDE, ROOM.HEIGHT);
        wallGeometry.setAttribute(
        'uv2',
        new THREE.BufferAttribute(wallGeometry.attributes.uv.array, 2)
        );

        const wallMaterial = new THREE.MeshStandardMaterial({ 
            side: THREE.DoubleSide, 
            map: WALLTEXTURE.ALBEDO,
            metalnessMap: WALLTEXTURE.METALLIC,
            roughnessMap: WALLTEXTURE.ROUGHNESS,
            aoMap: WALLTEXTURE.AO,
        });

        const repeatArr =  [WALLTEXTURE.ALBEDO, WALLTEXTURE.METALLIC, WALLTEXTURE.ROUGHNESS, WALLTEXTURE.AO];
        repeatTextures(repeatArr);

        const backWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.SIDE, ROOM.HEIGHT), wallMaterial);
        backWall.rotation.y = Math.PI;
        backWall.position.set(0, ROOM.POSFBY, ROOM.POSFBZ);
        this.scene.add(backWall);

        const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.SIDE,ROOM.HEIGHT),wallMaterial);
        frontWall.position.set(0,ROOM.POSFBY,-ROOM.POSFBZ);
        this.scene.add(frontWall);

        const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.SIDE,ROOM.HEIGHT),wallMaterial);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.set(ROOM.POSFBZ,ROOM.POSFBY,0);
        this.scene.add(leftWall);

        const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(ROOM.SIDE,ROOM.HEIGHT),wallMaterial);
        rightWall.rotation.y = Math.PI / 2;
        rightWall.position.set(-ROOM.POSFBZ,ROOM.POSFBY,0);
        this.scene.add(rightWall);
    }

    setUpLights(){
        // const light = new THREE.DirectionalLight(0xFFFFFF);
        // light.position.set(100,100,100);
        // light.target.position.set(0,0,0)
        // light.castShadow = true;
        // light.shadow.bias = -0.01;
        // light.shadow.camera.near = 0.1;
        // light.shadow.camera.far = 300;

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