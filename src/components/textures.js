import * as THREE from 'three';

const wallSrc = 'modern-brick1';

const textureLoader = new THREE.TextureLoader();

export const WALLTEXTURE = {
    ALBEDO : textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_albedo.png`),
    ROUGHNESS : textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_roughness.png`),
    AO : textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_ao.png`),
    HEIGHT: textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_height.png`),
    METALLIC : textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_metallic.png`),
    NORMAL: textureLoader.load(`/textures/${wallSrc}_bl/${wallSrc}_normal-olg.png`),
}