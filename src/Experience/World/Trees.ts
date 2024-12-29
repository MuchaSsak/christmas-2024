import * as THREE from "three";
import gsap from "gsap";

import Experience from "../Experience.ts";

export default class Trees {
  #experience = new Experience();
  #instances: THREE.Group[] = [];
  options = [
    {
      scale: 0.704,
      rotation: {
        x: 0.148,
        y: 2.319,
        z: 0,
      },
      startingPosition: {
        x: -1.589,
        y: -2,
        z: 3.105,
      },
      finalPosition: {
        x: -1.589,
        y: 1.279,
        z: 3.105,
      },
    },
    {
      scale: 0.835,
      rotation: {
        x: 6.251,
        y: 0.639,
        z: 0,
      },
      startingPosition: {
        x: -2.632,
        y: -2,
        z: -2.893,
      },
      finalPosition: {
        x: -2.632,
        y: 1.019,
        z: -2.893,
      },
    },
  ];

  constructor() {
    this.#setInstances();
    this.#setAnimation();
    this.#setDebug();
  }

  #setInstances() {
    for (let i = 0; i < this.options.length; i++) {
      const model = (this.#experience.assets.assetsLoaded.treeModel as any)
        .scene;
      this.#instances.push(model.clone());
    }

    this.#instances.forEach((instance, i) => {
      this.#setInstance(instance, i);
    });
  }

  #setInstance(instance: THREE.Group, i: number) {
    instance.position.set(
      this.options[i].startingPosition.x,
      this.options[i].startingPosition.y,
      this.options[i].startingPosition.z
    );
    instance.rotation.set(
      this.options[i].rotation.x,
      this.options[i].rotation.y,
      this.options[i].rotation.z
    );
    instance.scale.setScalar(this.options[i].scale);

    // Cast and receive shadow
    instance.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      child.receiveShadow = true;
      child.castShadow = true;
    });

    this.#experience.scene.add(instance);
  }

  #setAnimation() {
    this.#instances.forEach((instance, i) => {
      gsap.to(instance.position, {
        y: this.options[i].finalPosition.y,
        duration: 3.5,
        ease: "sine.inOut",
        delay: 1.25 + i * 0.825,
      });
    });
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const treesFolder = [];

    for (let i = 1; i <= this.options.length; i++) {
      treesFolder.push(this.#experience.debug.ui.addFolder(`Tree #${i}`));
    }

    treesFolder.forEach((treeFolder, i) => {
      // Position
      ["x", "y", "z"].forEach((axis) => {
        treeFolder
          .add(this.#instances[i].position, axis as keyof THREE.Vector3)
          .min(-20)
          .max(20)
          .step(0.001)
          .name(`position.${axis}`);
      });

      // Rotation
      ["x", "y", "z"].forEach((axis) => {
        treeFolder
          .add(this.#instances[i].rotation, axis as keyof THREE.Euler)
          .min(0)
          .max(Math.PI * 2)
          .step(0.001)
          .name(`rotation.${axis}`);
      });

      // Scale
      treeFolder
        .add(this.options[i], "scale")
        .min(0)
        .max(5)
        .step(0.001)
        .onChange((newScale: number) => {
          this.#instances[i].scale.setScalar(newScale);
        });
    });
  }
}
