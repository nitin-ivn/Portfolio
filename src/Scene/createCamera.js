import * as THREE from 'three'

class CustomCamera{

    constructor(){
        this.camera = null;
        this.playerBox = new THREE.Box3();
        this.playerSize = new THREE.Vector3(0.5, 1, 0.5);
    }

    createCamera(){
        this.camera = new THREE.PerspectiveCamera(
            65,
            window.innerWidth / window.innerHeight,
            0.1,
            300,
        )

        this.camera.position.set(0,1,3.5)
        // this.camera.position.set(-5,1,0);

        return this.camera;
    }

    updatePlayerBox(){
        const cameraPosition = this.camera.position;
        const min = cameraPosition.clone().sub(this.playerSize.clone().multiplyScalar(0.2));
        const max = cameraPosition.clone().add(this.playerSize.clone().multiplyScalar(0.2));
        this.playerBox.set(min,max);
    }

    checkCollisions(collisionObjects){
        let collided = false;
        collisionObjects.forEach((box) => {
            if(this.playerBox.intersectsBox(box)){
                collided = true;
            }
        });

        return collided;
    }
}

export default CustomCamera;