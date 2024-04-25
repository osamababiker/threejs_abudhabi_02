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

const animate = () => {
  requestAnimationFrame(animate)

  earth.rotation.y += 0.01
  moon.rotation.y += 0.005
  renderer.render(scene, camera)
}

animate()


window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
});
