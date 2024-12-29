import * as THREE from "three";

import Experience from "../Experience.ts";

export default class SnowParticles {
  #experience = new Experience();
  options = {
    count: 5000,
    radiusMultiplier: 15,
    yOffset: 7.5,
    yResetLevel: -1,
    fallingSpeed: 0.0005,
  };
  #geometry: THREE.BufferGeometry;
  #textures: {
    alpha?: THREE.Texture;
  } = {};
  #material: THREE.PointsMaterial;
  #points: THREE.Points;

  constructor() {
    this.#setGeometry();
    this.#setTextures();
    this.#setMaterial();
    this.#setPoints();
    this.#setAnimation();
    this.#setDebug();
  }

  #setGeometry() {
    this.#geometry = new THREE.BufferGeometry();

    const positions = new Float32Array(this.options.count * 3);

    for (let i = 0; i < this.options.count; i++) {
      positions[i * 3 + 0] =
        (Math.random() - 0.5) * this.options.radiusMultiplier;
      positions[i * 3 + 1] =
        Math.random() * this.options.radiusMultiplier + this.options.yOffset;
      positions[i * 3 + 2] =
        (Math.random() - 0.5) * this.options.radiusMultiplier;
    }

    this.#geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
  }

  #setTextures() {
    // Alpha
    this.#textures.alpha = this.#experience.assets.assetsLoaded
      .snowParticlesAlphaTexture as THREE.Texture;
  }

  #setMaterial() {
    this.#material = new THREE.PointsMaterial({
      transparent: true,
      alphaMap: this.#textures.alpha,
      size: 0.02,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }

  #setPoints() {
    this.#points = new THREE.Points(this.#geometry, this.#material);
    this.#experience.scene.add(this.#points);
  }

  #setAnimation() {
    window.requestAnimationFrame(() => {
      for (let i = 0; i < this.options.count; i++) {
        const position = this.#geometry.attributes.position.array; // [x, y, z, x, y, z, x, y, z...]

        if (position[i * 3 + 1] < this.options.yResetLevel) {
          // X
          position[i * 3 + 0] =
            (Math.random() - 0.5) * this.options.radiusMultiplier;
          // Y
          position[i * 3 + 1] =
            Math.random() * this.options.radiusMultiplier +
            this.options.yOffset;
          // Z
          position[i * 3 + 2] =
            (Math.random() - 0.5) * this.options.radiusMultiplier;
        } else {
          position[i * 3 + 1] -=
            this.#experience.time.delta * this.options.fallingSpeed;
        }
      }

      this.#geometry.attributes.position.needsUpdate = true;

      this.#setAnimation();
    });
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const folder = this.#experience.debug.ui.addFolder("SnowParticles");

    folder
      .add(this.options, "fallingSpeed")
      .min(0.000_001)
      .max(0.01)
      .step(0.0001);
    folder.add(this.options, "radiusMultiplier").min(1).max(100).step(0.01);
    folder.add(this.options, "yOffset").min(1).max(20).step(0.01);
    folder.add(this.options, "yResetLevel").min(-20).max(5).step(0.01);
  }
}
