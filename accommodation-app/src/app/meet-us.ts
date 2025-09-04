import { Component, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-meet-us',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="meet-us-wrapper">
      <!-- Lijeva strana: 3D model -->
      <div class="model-container">
        <div #canvasContainer class="canvas-container"></div>
      </div>

      <!-- Desna strana: tekst -->
      <div class="text-container">
        <h1 class="fade-in">Meet Us</h1>
        <p class="fade-in">
          Hello! My name is <strong>Mateja</strong> and I am the director of the <strong>BookStay agency</strong>.
          The agency was founded in 2025 in Osijek. Our goal is to help you find accommodation within the desired time frame.
        </p>
        <p class="fade-in delay-1">
          Therefore, if you need to find accommodation, feel free to <strong>contact</strong> us and we will find you several offers
          and you will decide which offer suits you best. So far, we have over 50 satisfied users, and the number of satisfied users
          is growing day by day.
        </p>
        <p class="fade-in delay-2">
          We are also expanding our offices throughout Croatia and so far we have offices in 5 major cities:
          <strong>Osijek, Zagreb, Rijeka, Split, Dubrovnik</strong>.
        </p>
        <p class="fade-in delay-3">
          If you are still not clear about how our agency and services work, take a look at the <strong>How we work</strong> page
          where you will find out in detail the procedure of our work. We look forward to meeting new users and providing
          them with our maximum service.
        </p>
        <div class="buttons-wrapper">
        <button class="back-button" (click)="goBack()">← Back</button>
        <button class="how-button" [routerLink]="['/work']">How we work</button>
      </div>
    </div>
  `,
  styles: [`
    .meet-us-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: flex-start;
      gap: 50px;
      padding: 50px;
      flex-wrap: wrap; /* za responsive da se model spusti ispod teksta na manjim ekranima */
    }

    .model-container {
      flex: 1 1 400px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

   .canvas-container {
      width: 500px;   /* povećaj dimenzije canvasa */
      aspect-ratio: 1/1; /* kvadrat, ali rasteže se automatski */
      height: auto;
      margin: 0;      /* makni marginu */
      padding: 0;     /* makni padding */
      border: none;   /* makni okvir */
      background: transparent; /* nema pozadine */
    }

    .canvas-container canvas {
      display: block;
      margin-top: 0;   /* da nema default margine */
      vertical-align: top; /* osigurava da bude na vrhu */
    }


    .text-container {
      flex: 1 1 400px;
      font-family: Arial, sans-serif;
      line-height: 1.8;
      color: #333;
      max-width: 500px;
      align-self: flex-start; /* diže ga gore u wrapperu */
      padding-top: 0;      /* fino pomakne prema gore */
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
      .text-container {
    text-align: left;
  }
    .text-container strong {
      color: #2980b9;
    }


    h1 { font-size: 42px; color: #2c3e50; margin-bottom: 20px; margin-top: -10px; }
    p { font-size: 18px; margin-bottom: 20px; }
    strong { color: #2980b9; }

    .buttons-wrapper {
  display: flex;
  justify-content: space-between; /* Back desno, How left */
  gap: 10px; /* razmak između dugmadi */
  margin-top: 30px; /* isto kao kod Back dugmeta */
  width: 100%; /* koristi punu širinu text-container */
}

.how-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #27ae60; /* zelena boja za primjer */
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.how-button:hover {
  background-color: #1e874b;
  transform: translateY(-2px);
}

.back-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #2980b9;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.back-button:hover {
  background-color: #1c5980;
  transform: translateY(-2px);
}


    .fade-in { opacity: 0; transform: translateY(20px); animation: fadeInUp 1s forwards; }
    .fade-in.delay-1 { animation-delay: 0.5s; }
    .fade-in.delay-2 { animation-delay: 1s; }
    .fade-in.delay-3 { animation-delay: 1.5s; }

    @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }

    /* Responsive */
    @media (max-width: 900px) {
      .meet-us-wrapper { flex-direction: column; align-items: center; }
      .canvas-container, .text-container { flex: unset; max-width: 100%; }
    }
  `]
})
export class MeetUsComponent implements AfterViewInit {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef;
  private renderer!: THREE.WebGLRenderer;
  private router = inject(Router);

  goBack() { this.router.navigate(['/']); }

  ngAfterViewInit() { this.initThree(); }

  private initThree() {
  const container = this.canvasContainer.nativeElement;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 3, 7);
  camera.lookAt(0, 1, 0); // gledaj malo iznad centra


  this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  this.renderer.setSize(container.clientWidth, container.clientHeight);
  this.renderer.setClearColor(0x000000, 0); // transparent background

  this.renderer.outputColorSpace = THREE.SRGBColorSpace;
  this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
  this.renderer.toneMappingExposure = 2.0; // podešava svjetlinu i kontrast

  container.appendChild(this.renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 2);
  dirLight.position.set(5, 10, 7.5);
  dirLight.castShadow = true;
  scene.add(dirLight);

  // Hemisphere light (svjetlo odozgo/dolje)
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  // Point light (žarulja koja osvjetljava izbliza)
  const pointLight = new THREE.PointLight(0xffffff, 1.2, 100);
  pointLight.position.set(0, 5, 5);
  scene.add(pointLight);

  this.renderer.shadowMap.enabled = true;
  this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const loader = new GLTFLoader();
  const mixers: THREE.AnimationMixer[] = [];
  const clock = new THREE.Clock();

  loader.load('assets/standing.glb', (gltf: GLTF) => {
  const model = gltf.scene;
  model.scale.set(2.5, 2.5, 2.5);
  model.position.set(0, -1, 0);

  model.traverse((o: any) => {
    if (o.isBone && o.name === 'Hips') {
      o.position.y = 0;
    }
  });

  scene.add(model);

  // Bounding box
  const bbox = new THREE.Box3().setFromObject(model);
  const boxHelper = new THREE.BoxHelper(model, 0xff0000);
  scene.add(boxHelper);

  // Animacije
  if (gltf.animations && gltf.animations.length > 0) {
    const mixer = new THREE.AnimationMixer(model);
    const clip = gltf.animations[0];
    const action = mixer.clipAction(clip);
    action.reset();
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.play();
    mixers.push(mixer);
  }

  // Animacija rendera
  const animate = () => {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  mixers.forEach(m => m.update(delta));
  boxHelper.update();

    // Update bounding box za animacije
    bbox.setFromObject(model);
    boxHelper.updateMatrixWorld(true);

    this.renderer.render(scene, camera);
  };
  animate();
}, undefined, (err) => {
  console.error('Greška pri učitavanju modela:', err);
});



 /*  const animate = () => {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    mixers.forEach(m => m.update(delta));
    box.update();
    this.renderer.render(scene, camera);
  };
  animate(); */

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  });
}}
