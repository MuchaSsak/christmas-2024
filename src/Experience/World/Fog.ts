import * as THREE from "three";

import Experience from "../Experience.ts";

const color = "#44547e";

export default class Fog {
  #experience = new Experience();
  #instance: THREE.FogExp2;
  color = color;

  constructor() {
    this.#setInstance();
    this.#setDebug();
  }

  #setInstance() {
    this.#instance = new THREE.FogExp2(this.color, 0.069);
    //  this.#instance = new THREE.FogExp2(this.color, 0);

    this.#experience.scene.fog = this.#instance;
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const folder = this.#experience.debug.ui.addFolder("Fog");

    folder.addColor(this, "color").onFinishChange((newColor: THREE.Color) => {
      this.#instance.color.set(newColor);
    });

    folder.add(this.#instance, "density").min(0).max(1).step(0.001);
  }
}
