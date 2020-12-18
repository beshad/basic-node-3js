import * as THREE from '/three/build/three.module.js'

import {
  OBJLoader
} from '/three/examples/jsm/loaders/OBJLoader.js'

import {
  MTLLoader
} from '/three/examples/jsm/loaders/MTLLoader.js'

import {
  GLTFLoader
} from '/three/examples/jsm/loaders/GLTFLoader.js'

import {
  OrbitControls
} from '/three/examples/jsm/controls/OrbitControls.js'


let cube
const scene = new THREE.Scene()

// const loader = new THREE.TextureLoader()
// const texture = loader.load('assets/pretty.jpg')

// const light = new THREE.DirectionalLight('#fff', 0.9)
// light.position.set(0,1,0)

const light = new THREE.AmbientLight('#fff', 1)
scene.add(light)

let material = new THREE.MeshBasicMaterial()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()
const controls = new OrbitControls(camera, renderer.domElement)

// new Promise(resolve => {
//   const loadingManager = new THREE.LoadingManager()
//   const sceneLoader = new GLTFLoader(loadingManager)
//   sceneLoader.load('/assets/tree.gltf', object => {
//     scene.add(object.scene)
//   })
// })


new Promise((resolve) => {
    mtlLoader.load('assets/cube.mtl', materials => {
      resolve(materials)
    })
  })
  .then(materials => {
    // materials.preload()
    // objLoader.setMaterials(materials)
    objLoader.load('assets/cube.obj', object => {
      cube = object
      const loader = new THREE.TextureLoader()
      loader.load('assets/pretty.jpg', texture => {
        texture.encoding = THREE.sRGBEncoding
        material.map = texture
        material.needsUpdate = true
        cube.children[0].material = material
        // cube.children[0].material.color.set('#f33')
        scene.add(object)
      })
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
