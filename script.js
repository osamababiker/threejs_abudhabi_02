import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Creating the scene
const scene = new THREE.Scene()

// Earth Shape
const earthSphere = new THREE.SphereGeometry(15, 50, 100)

// Moon Shape
const moonSphere = new THREE.SphereGeometry(5, 25, 50)

// Textures
const loader = new THREE.TextureLoader()

// Earth Material
const earthMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("./static/00_earthmap1k.jpg"),
  bumpMap: loader.load("./static/01_earthbump1k.jpg"),
  bumpScale: 0.5,
})

// Moon Material
const moonMaterial = new THREE.MeshStandardMaterial({
  map: loader.load("./static/moon/moonmap1k.jpg"),
  bumpMap: loader.load("./static/moon/moonbumpthumb.jpg"),
  bumpScale: 0.5,
})

// Earth Mesh
const earth = new THREE.Mesh(earthSphere, earthMaterial)
earth.rotation.z = -23.4 * Math.PI / 180;
scene.add(earth)

// Moon Mesh
const moon = new THREE.Mesh(moonSphere, moonMaterial)
moon.position.set(-30, 10, 5)
scene.add(moon)

// Seting up sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 50


// Lights
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Renderer
const canvas = document.querySelector("canvas.webgl")
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const tick = () => {
  requestAnimationFrame(tick)

  earth.rotation.y += 0.01
  moon.rotation.y += 0.001
  renderer.render(scene, camera)
}

tick()

// const earthGroup = new THREE.Group();
// earthGroup.rotation.z = -23.4 * Math.PI / 180;
// scene.add(earthGroup);
// new OrbitControls(camera, renderer.domElement);
// const detail = 12;
// const loader = new THREE.TextureLoader();
// const geometry = new THREE.IcosahedronGeometry(1, detail);
// const material = new THREE.MeshPhongMaterial({
//   map: loader.load("./static/00_earthmap1k.jpg"),
//   specularMap: loader.load("./static/02_earthspec1k.jpg"),
//   bumpMap: loader.load("./static/01_earthbump1k.jpg"),
//   bumpScale: 0.04,
// });
// const earthMesh = new THREE.Mesh(geometry, material);
// earthGroup.add(earthMesh);

// const lightsMat = new THREE.MeshBasicMaterial({
//   map: loader.load("./static/03_earthlights1k.jpg"),
//   blending: THREE.AdditiveBlending,
// });
// const lightsMesh = new THREE.Mesh(geometry, lightsMat);
// earthGroup.add(lightsMesh);

// const cloudsMat = new THREE.MeshStandardMaterial({
//   map: loader.load("./static/04_earthcloudmap.jpg"),
//   transparent: true,
//   opacity: 0.8,
//   blending: THREE.AdditiveBlending,
//   alphaMap: loader.load('./static/05_earthcloudmaptrans.jpg'),
//   // alphaTest: 0.3,
// });
// const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
// cloudsMesh.scale.setScalar(1.003);
// earthGroup.add(cloudsMesh);

// const fresnelMat = getFresnelMat();
// const glowMesh = new THREE.Mesh(geometry, fresnelMat);
// glowMesh.scale.setScalar(1.01);
// earthGroup.add(glowMesh);

// const stars = getStarfield({numStars: 2000});
// scene.add(stars);

// const sunLight = new THREE.DirectionalLight(0xffffff);
// sunLight.position.set(-2, 0.5, 1.5);
// scene.add(sunLight);

// function animate() {
//   requestAnimationFrame(animate);

//   earthMesh.rotation.y += 0.002;
//   lightsMesh.rotation.y += 0.002;
//   cloudsMesh.rotation.y += 0.0023;
//   glowMesh.rotation.y += 0.002;
//   stars.rotation.y -= 0.0002;
//   renderer.render(scene, camera);
// }

// animate();

// function handleWindowResize () {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }
// window.addEventListener('resize', handleWindowResize, false);