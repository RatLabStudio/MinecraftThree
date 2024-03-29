import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

function loadTexture(path) {
    const texture = textureLoader.load(path);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    return texture;
}

const textures = {
    dirt: loadTexture('../public/textures/dirt.png'),
    grass: loadTexture('../public/textures/grass.png'),
    grassSide: loadTexture('../public/textures/grass_side.png'),
    stone: loadTexture('../public/textures/stone.png'),
    coalOre: loadTexture('../public/textures/coal_ore.png'),
    ironOre: loadTexture('../public/textures/iron_ore.png')
};

export const blocks = {
    empty: {
        id: 0,
        name: 'empty'
    },
    grass: {
        id: 1,
        name: 'grass',
        color: 0x559020,
        material: [
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // Right
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // Left
            new THREE.MeshLambertMaterial({ map: textures.grass }),     // Top
            new THREE.MeshLambertMaterial({ map: textures.dirt }),      // Bottom
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // Front
            new THREE.MeshLambertMaterial({ map: textures.grassSide }), // Back
        ]
    },
    dirt: {
        id: 2,
        name: 'dirt',
        color: 0x807020,
        material: new THREE.MeshLambertMaterial({ map: textures.dirt })
    },
    stone: {
        id: 3,
        name: 'stone',
        color: 0x808080,
        scale: { x: 30, y: 30, z: 30 },
        scarcity: 0.5,
        material: new THREE.MeshLambertMaterial({ map: textures.stone })
    },
    coalOre: {
        id: 4,
        name: 'coalOre',
        color: 0x202020,
        scale: { x: 20, y: 20, z: 20 },
        scarcity: 0.8,
        material: new THREE.MeshLambertMaterial({ map: textures.coalOre })
    },
    ironOre: {
        id: 5,
        name: 'ironOre',
        color: 0x806060,
        scale: { x: 60, y: 60, z: 60 },
        scarcity: 0.9,
        material: new THREE.MeshLambertMaterial({ map: textures.ironOre })
    }
}

export const resources = [
    blocks.stone,
    blocks.coalOre,
    blocks.ironOre
];