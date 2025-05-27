import * as THREE from 'three'

function createScene(){
    const scene = new THREE.Scene();

    const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,1,1),
    new THREE.MeshStandardMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide
    })
    )
    floor.scale.x = 5;
    floor.scale.y = 7;
    floor.castShadow = false;
    floor.receiveShadow = true;
    floor.rotation.x = -(Math.PI / 2);
    scene.add(floor);

    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.position.set(100,100,100);
    light.target.position.set(0,0,0)
    light.castShadow = true;
    light.shadow.bias = -0.01;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 300;

    scene.add(light);
    scene.add(new THREE.AxesHelper(2));

    const ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient)

    return scene;
}