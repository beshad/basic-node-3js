import * as THREE from '/three/build/three.module.js'

import {
  OBJLoader
} from '/three/examples/jsm/loaders/OBJLoader.js'

import {
  MTLLoader
} from '/three/examples/jsm/loaders/MTLLoader.js'

let cube
const scene = new THREE.Scene()

const light = new THREE.DirectionalLight('#ffffff', 0.9)
light.position.set(-20, 0, 100)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000)
camera.position.z = 10

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()
// const controls = new OrbitControls( amera, renderer.domElement)


new Promise((resolve) => {
    mtlLoader.load('assets/cube.mtl', materials => {
      resolve(materials)
    })
  })
  .then(materials => {
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.load('assets/cube.obj', (object) => {
      cube = object
      scene.add(object)
    })
  })

const render = () => {
  if(cube) {
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01
  }

  requestAnimationFrame(render)
  renderer.render(scene, camera)
}

render()
