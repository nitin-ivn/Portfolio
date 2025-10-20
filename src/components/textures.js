import * as THREE from 'three';

const wallSrc = 'modern-brick1';
const pwallSrc = 'wornpaintedwoodsiding'

const textureLoader = new THREE.TextureLoader();

export const WALLTEXTURE = {
    ALBEDO : textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_albedo.png`),
    ROUGHNESS : textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_roughness.png`),
    AO : textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_ao.png`),
    HEIGHT: textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_height.png`),
    METALLIC : textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_metallic.png`),
    NORMAL: textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_normal-olg.png`),
}


// export const PWALLTEXTURE = {
//     ALBEDO : textureLoader.load(`/textures/${pwallSrc}-bl/${pwallSrc}-albedo.png`),
//     ALBEDO : textureLoader.load(`/textures/woodPlanks/`)
//     ROUGHNESS : textureLoader.load(`/textures/${pwallSrc}-bl/${pwallSrc}-roughness.png`),
//     AO : textureLoader.load(`/textures/${pwallSrc}-bl/${pwallSrc}-ao.png`),
//     METALLIC : textureLoader.load(`/textures/${pwallSrc}-bl/${pwallSrc}-metalness.png`),
//     NORMAL: textureLoader.load(`/textures/${pwallSrc}-bl/${pwallSrc}-normal-olg.png`),
// }


export const PWALLTEXTURE = {
    ALBEDO: textureLoader.load(`/textures/woodPlanks/wood12_baseColor.png`),
    ROUGHNESS: textureLoader.load(`/textures/woodPlanks/wood12_roughness.png`),
    AO: textureLoader.load(`/textures/woodPlanks/wood12_ambientOcclusion.png`),
    METALLIC: textureLoader.load(`/textures/woodPlanks/wood12_metallic.png`),
    NORMAL: textureLoader.load(`/textures/woodPlanks/wood12_normal.png`),
    HEIGHT: textureLoader.load(`/textures/woodPlanks/wood12_height.png`),
    SPECULAR: textureLoader.load(`/textures/woodPlanks/wood12_specular.png`),
    GLOSSINESS: textureLoader.load(`/textures/woodPlanks/wood12_glossiness.png`)
};

export const POSTEXTURE = textureLoader.load('/textures/poster.png', (tex) => {
    tex.encoding = THREE.sRGBEncoding;
    tex.needsUpdate = true;
  });


function rotateTexture(texture) {
    texture.rotation = Math.PI;
    texture.needsUpdate = true;
}

Object.values(PWALLTEXTURE).forEach(texture => rotateTexture(texture));



const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/cubeMap/');

export const homePageTextures = {
    backgroundCubeMap : cubeTextureLoader.load( [
          'px.png',
          'nx.png',
          'py.png',
          'ny.png',
          'pz.png',
          'nz.png'
        ] )
}


export const repeatTextures = (arr,repeatX,repeatY) => {
    arr.forEach((tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(repeatX,repeatY);
    });
}