import * as THREE from 'three';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import Stats from '../node_modules/three/examples/jsm/libs/stats.module.js';
import { World } from './world';
import { createUI } from './ui';
import { Player } from './player.js';
import { Physics } from './physics.js';

const stats = new Stats();
document.body.append(stats.dom);

// Renderer Setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000020);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
document.body.appendChild(renderer.domElement);

// Camera Setup
const orbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
orbitCamera.position.set(-32, 16, -32);

const controls = new OrbitControls(orbitCamera, renderer.domElement);
controls.target.set(16, 0, 16);
controls.update();

// Scene Setup
const scene = new THREE.Scene();
const world = new World();
world.generate();
scene.add(world);

const player = new Player(scene);

const physics = new Physics(scene);

function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.intensity = 0.8;
    sun.position.set(50, 50, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.bottom = -50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 100;
    sun.shadow.bias = -0.00005;
    sun.shadow.mapSize = new THREE.Vector2(256, 256)
    scene.add(sun);

    /*const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
    scene.add(shadowHelper);*/

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.15;
    scene.add(ambient);
}

// Render Loop
let previousTime = performance.now();
function animate() {
    let currentTime = performance.now();
    let dt = (currentTime - previousTime) / 1000;

    requestAnimationFrame(animate);
    player.applyInputs(dt);
    player.updateBoundsHelper();
    physics.update(dt, player, world);
    renderer.render(scene, player.controls.isLocked ? player.camera : orbitCamera);
    stats.update();

    previousTime = currentTime;
}

window.addEventListener('resize', () => {
    orbitCamera.aspect = window.innerWidth / window.innerHeight;
    orbitCamera.updateProjectionMatrix();
    player.camera.aspect = window.innerWidth / window.innerHeight;
    player.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
createUI(world, player);
animate();