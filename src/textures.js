import * as THREE from 'three'
import { ROOM } from './constants';

const floorSrc = 'older-wood-flooring';
const ceilingSrc = 'chipping-painted-wall-bl';
const wallSrc = 'clapboard-vinyl-siding';

const textureLoader = new THREE.TextureLoader();

export const FLOORTEXTURE = {
    ALBEDO : textureLoader.load(`/textures/${floorSrc}-bl/${floorSrc}_albedo.png`),
    ROUGHNESS : textureLoader.load(`/textures/${floorSrc}-bl/${floorSrc}_roughness.png`),
    AO : textureLoader.load(`/textures/${floorSrc}-bl/${floorSrc}_ao.png`),
    HEIGHT: textureLoader.load(`/textures/${floorSrc}-bl/${floorSrc}_height.png`),
    METALLIC : textureLoader.load(`/textures/${floorSrc}-bl/${floorSrc}_metallic.png`),
    NORMAL: textureLoader.load(`/textures/${floorSrc}-bl/${floorSrc}_normal-olg.png`),
}  

export const CEILINGTEXTURE = {
    ALBEDO : textureLoader.load(`/textures/${ceilingSrc}-bl/${ceilingSrc}_albedo.png`),
    ROUGHNESS : textureLoader.load(`/textures/${ceilingSrc}-bl/${ceilingSrc}_roughness.png`),
    AO : textureLoader.load(`/textures/${ceilingSrc}-bl/${ceilingSrc}_ao.png`),
    HEIGHT: textureLoader.load(`/textures/${ceilingSrc}-bl/${ceilingSrc}_height.png`),
    METALLIC : textureLoader.load(`/textures/${ceilingSrc}-bl/${ceilingSrc}_metallic.png`),
    NORMAL: textureLoader.load(`/textures/${ceilingSrc}-bl/${ceilingSrc}_normal-olg.png`),
}

export const WALLTEXTURE = {
    ALBEDO : textureLoader.load(`/textures/${wallSrc}-bl/${wallSrc}_albedo.png`),
    ROUGHNESS : textureLoader.load(`/textures/${wallSrc}-bl/${wallSrc}_roughness.png`),
    AO : textureLoader.load(`/textures/${wallSrc}-bl/${wallSrc}_ao.png`),
    HEIGHT: textureLoader.load(`/textures/${wallSrc}-bl/${wallSrc}_height.png`),
    METALLIC : textureLoader.load(`/textures/${wallSrc}-bl/${wallSrc}_metallic.png`),
    NORMAL: textureLoader.load(`/textures/${wallSrc}-bl/${wallSrc}_normal-olg.png`),
}


export const repeatTextures = (arr) => {
    arr.forEach((tex) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(ROOM.SIDE / 3, ROOM.SIDE / 3);
    });
}