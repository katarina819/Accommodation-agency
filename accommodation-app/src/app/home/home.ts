import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';
import { NgIf } from '@angular/common';
import { LottieComponent, provideLottieOptions, AnimationOptions } from 'ngx-lottie';
import { gsap } from 'gsap';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, LottieComponent],
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web')
    })
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;

  maleOptions: AnimationOptions = { path: '/assets/male.json' };
  femaleOptions: AnimationOptions = { path: '/assets/female.json' };

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
  // Odgoda animacije dok DOM nije spreman
  if (typeof window !== 'undefined') {
    // Provjeravamo da li SVG elementi postoje
    const mouth = document.querySelector("#mouth");
    const leftArm = document.querySelector("#left-arm");
    const rightArm = document.querySelector("#right-arm");

    if (mouth && leftArm && rightArm) {
      gsap.to(mouth, {
        duration: 1,
        repeat: -1,
        yoyo: true,
        morphSVG: "M85,90 Q100,120 115,90"
      });

      gsap.to(leftArm, {
        rotation: 30,
        transformOrigin: "top center",
        yoyo: true,
        repeat: -1,
        duration: 1
      });

      gsap.to(rightArm, {
        rotation: -30,
        transformOrigin: "top center",
        yoyo: true,
        repeat: -1,
        duration: 1
      });
    } else {
      console.warn("SVG elementi nisu pronađeni za GSAP animaciju.");
    }

    // Pokrećemo Three.js animaciju
    if (this.canvasContainer) {
      this.initThree();
    } else {
      console.error('canvasContainer nije dostupan');
}
  }
  }

  initThree() {
    const container = this.canvasContainer.nativeElement;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 150, 300);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 200, 100);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

   const loader = new FBXLoader();
loader.load('/assets/swing_dancing.fbx', (object) => {
  scene.add(object);

  // Provjera ima li animacija
  if (object.animations && object.animations.length > 0) {
    const mixer = new THREE.AnimationMixer(object);

    object.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta); // <-- ovo pokreće animaciju
      renderer.render(scene, camera);
    };
    animate();
  } else {
    // Ako nema animacija, samo render
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    }
  });
} 

} 
