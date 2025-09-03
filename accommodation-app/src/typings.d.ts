declare module 'three/examples/jsm/loaders/GLTFLoader.js' {
  import { Object3D, AnimationClip } from 'three';

  export class GLTFLoader {
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }

  export interface GLTF {
    scene: Object3D;
    animations: AnimationClip[];
  }
}


