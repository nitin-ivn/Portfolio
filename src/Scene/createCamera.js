import * as THREE from 'three'

export function createCamera(){
    const camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        300,
    )

camera.position.set(0,1,5)

return camera
}