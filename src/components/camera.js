import * as THREE from 'three';

class CustomCamera{
    constructor(){
        this.camera = null;
    }

    createCamera(){
        this.camera = new THREE.PerspectiveCamera(
            65,
            window.innerWidth/window.innerHeight,
            0.1,
            300,
        )

        this.camera.position.set(0,0,3.7);
        this.camera.lookAt(1,1,1)
        return this.camera;
    }
}

export default CustomCamera;