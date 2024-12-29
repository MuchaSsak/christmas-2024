import * as THREE from "three";

import Experience from "../Experience.ts";

const color = "#d4d6f7";

export default class AmbientLight {
  #experience = new Experience();
  #instance: THREE.AmbientLight;
  color = color;

  constructor() {
    this.#setInstance();
    this.#setDebug();
  }

  #setInstance() {
    this.#instance = new THREE.AmbientLight(this.color, 0.54);
    this.#experience.scene.add(this.#instance);
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const folder = this.#experience.debug.ui.addFolder("AmbientLight");

    folder.addColor(this, "color").onChange((newColor: THREE.Color) => {
      this.#instance.color.set(newColor);
    });
    folder.add(this.#instance, "intensity").min(0).max(5).step(0.01);
  }
}
