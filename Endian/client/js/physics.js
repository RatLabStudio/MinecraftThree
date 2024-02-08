import * as THREE from 'three';
import { blocks } from './blocks.js';

const collisionMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.2
});
const collisionGeometry = new THREE.BoxGeometry(1.001, 1.001, 1.001);

export class Physics {
    constructor(scene) {
        this.helpers = new THREE.Group();
        scene.add(this.helpers);
    }

    update(dt, player, world) {
        this.detectCollisions(player, world);
    }

    detectCollisions(player, world) {
        const candidates = this.broadPhase(player, world);
        /*const collisions = this.narrowPhase(candidates, player);

        if (collisions.length > 0) {
            this.resolveCollisions(collisions);
        }*/
    }

    broadPhase(player, world) {
        const candidates = [];

        const extents = {
            x: {
                min: Math.floor(player.position.x - player.radius),
                max: Math.ceil(player.position.x + player.radius)
            },
            y: {
                min: Math.floor(player.position.y - player.height),
                max: Math.ceil(player.position.y)
            },
            z: {
                min: Math.floor(player.position.z - player.radius),
                max: Math.ceil(player.position.z + player.radius)
            },
        }

        for (let x = extents.x.min; x < extents.x.max; x++) {
            for (let y = extents.y.min; y < extents.y.max; y++) {
                for (let z = extents.z.min; z < extents.z.max; z++) {
                    const block = world.getBlock(x, y, z);
                    if (block && block.id !== blocks.empty.id) {
                        const blockPos = { x, y, z };
                        candidates.push(blockPos);
                        this.addCollisionHelper(blockPos);
                    }
                }
            }
        }

        return candidates;
    }

    narrowPhase(candidates, player) {
        const collisions = [];

        for (const block of candidates) {
            // https://youtu.be/_aK-1L-GC6I?si=Gb7hyvqqpk65_P3w&t=923
        }

        return collisions;
    }

    addCollisionHelper(block) {
        const blockMesh = new THREE.Mesh(collisionGeometry, collisionMaterial);
        blockMesh.position.copy(block);
        this.helpers.add(blockMesh);
    }
}