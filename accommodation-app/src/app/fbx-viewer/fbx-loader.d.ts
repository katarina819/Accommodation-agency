declare module 'three/examples/jsm/loaders/FBXLoader.js' {
  import { Group, AnimationClip } from 'three';
  import { Loader } from 'three/src/loaders/Loader';
  
  export class FBXLoader extends Loader {
    load(
      url: string,
      onLoad: (object: Group & { animations: AnimationClip[] }) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}
