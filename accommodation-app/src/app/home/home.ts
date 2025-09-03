import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { NgIf } from '@angular/common';
// import { LottieComponent, provideLottieOptions, AnimationOptions } from 'ngx-lottie';
// import { gsap } from 'gsap';
// import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

// gsap.registerPlugin(MorphSVGPlugin);

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  private renderer!: THREE.WebGLRenderer;
/* 
  maleOptions: AnimationOptions = { path: '/assets/male.json' };
  femaleOptions: AnimationOptions = { path: '/assets/female.json' }; */

  messages = [
    { speaker: 'male', text: 'Welcome to BookStay' },
    { speaker: 'female', text: 'Whether you’re relocating temporarily or for work, but don’t have a place to stay,' },
    { speaker: 'male', text: 'you’ve come to the right place.' },
    { speaker: 'male', text: 'Get to know us,' },
    { speaker: 'male', text: 'and we’ll help you find accommodation within your desired timeframe!' },
  ];

  currentIndex = 0;

  constructor(private el: ElementRef) {}

  get currentMessage() {
    return this.messages[this.currentIndex];
  }

  nextMessage() {
    if (this.currentIndex < this.messages.length - 1) {
      this.currentIndex++;
    }
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      // SVG animacije
      /* const mouth = document.querySelector("#mouth");
      const leftArm = document.querySelector("#left-arm");
      const rightArm = document.querySelector("#right-arm");

      if (mouth && leftArm && rightArm) {
        gsap.to(mouth, { duration: 1, repeat: -1, yoyo: true, morphSVG: "M85,90 Q100,120 115,90" });
        gsap.to(leftArm, { rotation: 30, transformOrigin: "top center", yoyo: true, repeat: -1, duration: 1 });
        gsap.to(rightArm, { rotation: -30, transformOrigin: "top center", yoyo: true, repeat: -1, duration: 1 });
      } else {
        console.warn("SVG elementi nisu pronađeni za GSAP animaciju.");
      } */

      if (this.canvasContainer) {
        this.initThree();
      }
    }
  } 
 
  initThree() {
  const container = this.canvasContainer.nativeElement;

  // 🔹 Scene
  const scene = new THREE.Scene();
  scene.background = null;

  // 🔹 Kamera (pogled na modele ispod dugmeta)
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    5000
  );
  camera.position.set(0, 120, 400); // prilagođeno da modeli budu ispod Next dugmeta
  camera.lookAt(0, 50, 0);

  // 🔹 Renderer
  this.renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    precision: 'highp'
  });
  this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  this.renderer.toneMappingExposure = 1.2;
  this.renderer.setSize(container.clientWidth, container.clientHeight);
  this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
  container.appendChild(this.renderer.domElement);

  // 🔹 Responsive resize
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // 🔹 Lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(0, 300, 200);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  hemiLight.position.set(0, 300, 0);
  scene.add(hemiLight);

  // 🔹 Animation mixers
  const mixers: THREE.AnimationMixer[] = [];
  const clock = new THREE.Clock();
  const loader = new GLTFLoader();

  // 🔹 Sigurna funkcija za učitavanje modela
  const loadModel = (path: string, position: THREE.Vector3) => {
    loader.load(
      path,
      (gltf: GLTF) => {
        const object = gltf.scene;

        // Skaliranje prema max dimenziji
        const box = new THREE.Box3().setFromObject(object);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 200 / maxDim;
        object.scale.setScalar(scaleFactor);

        // Centriranje
        const newBox = new THREE.Box3().setFromObject(object);
        const center = newBox.getCenter(new THREE.Vector3());
        const sizeAfter = newBox.getSize(new THREE.Vector3());
        object.position.sub(center);

        // Pozicija ispod dugmeta
        object.position.y += sizeAfter.y / 2 - 20;
        object.position.add(position);

        // 🔹 Sigurno zamijeni materijale ako teksture ne učitava
        object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = true;
          mesh.receiveShadow = true;
    
        // Ako materijal nema teksturu, zadrži originalnu boju
        if (!(mesh.material as any).map) {
          const oldMat = mesh.material as THREE.MeshStandardMaterial;
          mesh.material = new THREE.MeshStandardMaterial({
            color: oldMat.color ? oldMat.color : 0xaaaaaa,
            metalness: oldMat.metalness ?? 0.5,
            roughness: oldMat.roughness ?? 0.5
          });
        }

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    // 🔹 Dodatak za SkinnedMesh (sprječava nestajanje ruku)
        if ((child as THREE.SkinnedMesh).isSkinnedMesh) {
          const skinnedMesh = child as THREE.SkinnedMesh;
          skinnedMesh.frustumCulled = false; // uvijek renderiraj ruke
        }
      });


        scene.add(object);

        // Animacije
        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(object);
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.reset();
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
          });
          mixers.push(mixer);
        }

        console.log(`Loaded model: ${path}`, object.position);
      },
      undefined,
      (error) => {
        console.error('GLTF load error:', error);
      }
    );
  };

  // 🔹 Učitaj modele
  loadModel('assets/swing_dancing.glb', new THREE.Vector3(-100, 0, 0));
  loadModel('assets/waving.glb', new THREE.Vector3(100, 0, 0));

  // 🔹 Animacijska petlja
const animate = () => {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  mixers.forEach((mixer) => {
    mixer.update(delta);

    // Traverse kroz sve child objekte root-a mixer-a
    const root = mixer.getRoot();
    if (root instanceof THREE.Object3D) {
    root.traverse((child: THREE.Object3D) => {
      if ((child as THREE.SkinnedMesh).isSkinnedMesh) {
        const skinned = child as THREE.SkinnedMesh;
        skinned.frustumCulled = false;
        skinned.geometry.computeBoundingBox();
        skinned.geometry.computeBoundingSphere();
      }
    });
    }})

  this.renderer.render(scene, camera);
};


  animate();
}


  ngOnDestroy() {
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer.domElement = null!;
    }
  }
}