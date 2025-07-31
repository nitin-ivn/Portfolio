import * as THREE from 'three';

import gsap from "gsap";

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

        this.camera.layers.enable(2);

        this.updateCameraPosition();
        return this.camera;
    }

    updateCameraPosition(){
        const aspectRatio = window.innerWidth / window.innerHeight;

        if(aspectRatio < 1 && aspectRatio >= 0.65){
            this.camera.position.set(0,0,11);
        }else if(aspectRatio < 0.65){
            this.camera.position.set(0,0,15)
        }else if(aspectRatio >= 1 && aspectRatio < 1.5){
            this.camera.position.set(0,0,7);
        }else{
            this.camera.position.set(0,0,3.7);
        }

        
    }

    updateCameraOnResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.updateCameraPosition();
        this.camera.updateProjectionMatrix();
    }

    doorOpened(doorMesh){
        console.log(doorMesh);
    const targetPosition = doorMesh.position.clone();
    targetPosition.z += 1;

    const lookAtTarget = doorMesh.position.clone();

    gsap.to(this.camera.position, {
        x: targetPosition.x,
        z: targetPosition.z,
        duration: 3,
        ease: 'power2.out',
        onUpdate: () => {
            // this.camera.lookAt(lookAtTarget);
        }
    });
}

}

export default CustomCamera;