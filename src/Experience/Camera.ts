import * as THREE from "three";

import Experience from "./Experience.ts";

export default class Camera {
  #experience = new Experience();
  instance: THREE.PerspectiveCamera;

  constructor() {
    this.#setInstance();
    this.#setAnimation();
    this.#setDebug();
  }

  #setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.#experience.sizes.width / this.#experience.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6.981, 2.844, -0.121);
    this.instance.rotation.set(0, 1.6, 0);
    this.instance.lookAt(0, 3, 0);
    this.#experience.scene.add(this.instance);
  }

  #setAnimation() {
    window.addEventListener("mousemove", (e) => {
      // Normalize values
      const x = -(e.clientX / this.#experience.sizes.width - 0.5);
      const y = -(e.clientY / this.#experience.sizes.height - 0.5);

      this.instance.lookAt(0, 3 + y, 0 + x);
    });
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const folder = this.#experience.debug.ui.addFolder("PerspectiveCamera");

    ["x", "y", "z"].forEach((axis) => {
      folder
        .add(this.instance.position, axis as keyof THREE.Vector3)
        .min(-20)
        .max(20)
        .step(0.001)
        .name(`position.${axis}`);
    });

    ["x", "y", "z"].forEach((axis) => {
      folder
        .add(this.instance.rotation, axis as keyof THREE.Euler)
        .min(0)
        .max(Math.PI * 2)
        .step(0.001)
        .name(`rotation.${axis}`);
    });
  }

  resize() {
    this.instance.aspect =
      this.#experience.sizes.width / this.#experience.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
