import * as THREE from 'three';

import gsap from "gsap";

class CustomCamera{
    constructor(){
        this.camera = null;
        this.cameraPos = new THREE.Vector3();
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
            this.cameraPos.set(0,0,11);
            this.camera.position.copy(this.cameraPos);
        }else if(aspectRatio < 0.65){
            this.cameraPos.set(0,0,15)
            this.camera.position.copy(this.cameraPos);
        }else if(aspectRatio >= 1 && aspectRatio < 1.5){
            this.cameraPos.set(0,0,7);
            this.camera.position.copy(this.cameraPos);
        }else{
            this.cameraPos.set(0,0,3.7);
            this.camera.position.copy(this.cameraPos);
        }

        
    }

    updateCameraOnResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.updateCameraPosition();
        this.camera.updateProjectionMatrix();
    }

    doorOpened(doorMesh){
        return new Promise((resolve) => {
            const targetPosition = doorMesh.position.clone();
            targetPosition.z += 1;

            const lookAtTarget = doorMesh.position.clone();

            gsap.to(this.camera.position, {
                x: targetPosition.x,
                z: targetPosition.z - 1,
                duration: 4,
                ease: 'power2.out',
                onComplete: () => {
                    resolve();
                }
            });
        })
    }

    doorClosed(){
        gsap.to(this.camera.position, {
            x: this.cameraPos.x,
            z: this.cameraPos.z,
            duration: 3,
            ease: 'power2.out',
            onComplete: () => {
                //console.log("closed")
            }
        });
    }

}

export default CustomCamera;