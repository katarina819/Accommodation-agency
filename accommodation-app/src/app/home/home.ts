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
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    // 🔹 Axes i Grid za debugging
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(400, 20);
    scene.add(gridHelper);

    // 🔹 Kamera udaljena od scene
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 150, 300);
    camera.lookAt(0, 0, 0);

    // 🔹 Renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      precision: 'highp'
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    container.appendChild(this.renderer.domElement);

    this.renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      console.warn('WebGL context lost!');
    }, false);

    // 🔹 Svjetla
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 200, 100);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // 🔹 Animacijski mikseri i clock
    const mixers: THREE.AnimationMixer[] = [];
    const clock = new THREE.Clock();
    const loader = new GLTFLoader();

    // 🔹 Funkcija za učitavanje modela
    const loadModel = (path: string, position: THREE.Vector3) => {
      loader.load(path, (gltf: GLTF) => {
  const object = gltf.scene;

  // 🔹 Skaliranje modela
  object.scale.set(50, 50, 50);

  // 🔹 Centriranje i podizanje na tlo
  const box = new THREE.Box3().setFromObject(object);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  object.position.sub(center);
  object.position.y += size.y / 2;
  object.position.add(position);

  scene.add(object);

  // 🔹 Konzolni log za debug
  console.log(`Model: ${path}`);
  console.log('Center:', center);
  console.log('Size:', size);
  console.log('Position after centering and offset:', object.position);

  // 🔹 Animacije
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
});

    };

    // 🔹 Učitaj modele
    loadModel('assets/swing_dancing.glb', new THREE.Vector3(0, 0, 0));
    loadModel('assets/waving.glb', new THREE.Vector3(50, 0, 0)); // bliže centru

    // 🔹 Animacijska petlja
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));
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
