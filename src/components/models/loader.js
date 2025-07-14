import { GLTFLoader } from "three/examples/jsm/Addons.js";

const loader = new GLTFLoader();

export const loadModel = async (url) => {
    try{
        const gltf = await loader.loadAsync(url);
        console.log(gltf);
        return gltf.scene;
    } catch(e){
        console.log(e);
    }

}