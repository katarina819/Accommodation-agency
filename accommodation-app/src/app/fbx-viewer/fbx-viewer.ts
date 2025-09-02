import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

@Component({
  selector: 'app-fbx-viewer',
  template: `<div #canvasContainer class="fbx-container"></div>`,
  styles: [`
    .fbx-container {
      width: 100%;
      height: 500px;
    }
  `]
})
export class FbxViewerComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) container!: ElementRef;

  ngAfterViewInit() {
    // 1️⃣ Scena, kamera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    const camera = new THREE.PerspectiveCamera(
      75,
      this.container.nativeElement.clientWidth / this.container.nativeElement.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      this.container.nativeElement.clientWidth,
      this.container.nativeElement.clientHeight
    );
    this.container.nativeElement.appendChild(renderer.domElement);

    // 2️⃣ Svjetlo
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040); // mekano svjetlo
    scene.add(ambientLight);

    // 3️⃣ Loader FBX modela
    const loader = new FBXLoader();
    loader.load('assets/Swing Dancing.fbx', (object) => {
      scene.add(object);

      // Animacija
      if (object.animations && object.animations.length) {
        const mixer = new THREE.AnimationMixer(object);
        object.animations.forEach((clip) => mixer.clipAction(clip).play());

        const clock = new THREE.Clock();
        const animate = () => {
          requestAnimationFrame(animate);
          mixer.update(clock.getDelta());
          renderer.render(scene, camera);
        };
        animate();
      } else {
        renderer.render(scene, camera);
      }
    });
  }
}
