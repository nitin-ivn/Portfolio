import * as THREE from 'three'

class CustomCamera{

    constructor(){
        this.camera = null;
        this.playerBox = new THREE.Box3();
        this.playerSize = new THREE.Vector3(0.5, 1, 0.5);
    }

    createCamera(){
        this.camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            0.1,
            300,
        )

        this.camera.position.set(0,1,3.5)

        return this.camera;
    }

    updatePlayerBox(){
        const cameraPosition = this.camera.position;
        const min = cameraPosition.clone().sub(this.playerSize.clone().multiplyScalar(0.5));
        const max = cameraPosition.clone().add(this.playerSize.clone().multiplyScalar(0.5));
        this.playerBox.set(min,max);
    }

    checkCollisions(collisionObjects, directions){
        collisionObjects.forEach((box) => {
            if(this.playerBox.intersectsBox(box)){
                console.log('collided');
            }
        });
    }
}

export default CustomCamera;