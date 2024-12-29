import * as THREE from "three";

import Experience from "../Experience.ts";

export default class Music {
  #experience = new Experience();

  constructor() {
    this.#setInstance();
  }

  #setInstance() {
    // Create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    this.#experience.camera.instance.add(listener);

    // Create a global audio source
    const sound = new THREE.Audio(listener);
    sound.setBuffer(
      this.#experience.assets.assetsLoaded.musicSound as AudioBuffer
    );
    sound.setLoop(true);
    sound.setVolume(0.015);
    sound.play();
  }
}
