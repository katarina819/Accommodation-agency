import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

@Component({
  selector: 'app-fbx-viewer',
  template: `<div #canvasContainer class="fbx-container"></div>`,
  styles: [`
    .fbx-container {
      width: 100%;
      height: 600px;
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

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // 3️⃣ Mixeri i clock (GLOBALNO)
    const mixers: THREE.AnimationMixer[] = [];
    const clock = new THREE.Clock();

    // 4️⃣ Funkcija za učitavanje modela
    const loader = new FBXLoader();
    const loadModel = (path: string, position: THREE.Vector3) => {
      loader.load(path, (object) => {
        object.position.copy(position);
        scene.add(object);

        if (object.animations && object.animations.length) {
          const mixer = new THREE.AnimationMixer(object);
          object.animations.forEach((clip) => mixer.clipAction(clip).play());
          mixers.push(mixer);
        }
      });
    };

    // Učitaj oba modela
    loadModel('assets/Swing Dancing.fbx', new THREE.Vector3(0, 0, 0));
    loadModel('assets/waving.fbx', new THREE.Vector3(200, 0, 0));

    // 5️⃣ Jedna globalna petlja animacije
    const animate = () => {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();
      mixers.forEach((mixer) => mixer.update(delta));

      renderer.render(scene, camera);
    };
    animate();
  }
}
