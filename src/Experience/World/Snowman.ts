import * as THREE from "three";
import gsap from "gsap";

import Experience from "../Experience.ts";

export default class Snowman {
  #experience = new Experience();
  #instance: THREE.Group;
  options = {
    scale: 0.853,
    yStartingPosition: 0,
    yFinalPosition: 2.13,
  };

  constructor() {
    this.#setInstance();
    this.#setAnimation();
    this.#setDebug();
  }

  #setInstance() {
    this.#instance = (this.#experience.assets.assetsLoaded.snowmanModel as any)
      .scene as THREE.Group;

    this.#instance.position.set(4.16, this.options.yStartingPosition, 0);
    this.#instance.rotation.set(0.066, 0.189, 0.025);
    this.#instance.scale.setScalar(this.options.scale);

    // Cast shadow
    this.#instance.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.castShadow = true;
    });

    this.#experience.scene.add(this.#instance);
  }

  #setAnimation() {
    gsap.to(this.#instance.position, {
      duration: 2,
      delay: 2,
      ease: "circ.out",
      y: this.options.yFinalPosition,
    });
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const folder = this.#experience.debug.ui.addFolder("Snowman");

    ["x", "y", "z"].forEach((axis) => {
      folder
        .add(this.#instance.position, axis as keyof THREE.Vector3)
        .min(-10)
        .max(10)
        .step(0.001)
        .name(`position.${axis}`);
    });

    ["x", "y", "z"].forEach((axis) => {
      folder
        .add(this.#instance.rotation, axis as keyof THREE.Euler)
        .min(0)
        .max(Math.PI * 2)
        .step(0.001)
        .name(`rotation.${axis}`);
    });

    folder
      .add(this.options, "scale")
      .min(0)
      .max(3)
      .step(0.001)
      .name("scale")
      .onChange((newScale: number) => {
        this.#instance.scale.setScalar(newScale);
      });
  }
}
