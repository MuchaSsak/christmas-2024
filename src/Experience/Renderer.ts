import * as THREE from "three";

import Experience from "./Experience.ts";

const clearColor = "#44547e";

export default class Renderer {
  #experience = new Experience();
  #instance: THREE.WebGLRenderer;
  clearColor = clearColor;

  constructor() {
    this.#setInstance();
    this.#setDebug();
  }

  #setInstance() {
    this.#instance = new THREE.WebGLRenderer({
      canvas: this.#experience.canvas,
      antialias: true,
    });
    this.#instance.outputColorSpace = THREE.SRGBColorSpace;
    this.#instance.toneMapping = THREE.ACESFilmicToneMapping;
    this.#instance.toneMappingExposure = 1.39;
    this.#instance.shadowMap.enabled = true;
    this.#instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.#instance.setClearColor(this.clearColor);
    this.#instance.setSize(
      this.#experience.sizes.width,
      this.#experience.sizes.height
    );
    this.#instance.setPixelRatio(this.#experience.sizes.pixelRatio);
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const folder = this.#experience.debug.ui.addFolder("WebGLRenderer");

    folder.add(this.#instance, "toneMapping", {
      None: THREE.NoToneMapping,
      Linear: THREE.LinearToneMapping,
      Reinhard: THREE.ReinhardToneMapping,
      Cineon: THREE.CineonToneMapping,
      ACESFilmic: THREE.ACESFilmicToneMapping,
      Neutral: THREE.NeutralToneMapping,
    });
    folder.add(this.#instance, "toneMappingExposure").min(0).max(5).step(0.01);

    folder
      .addColor(this, "clearColor")
      .onFinishChange((newColor: THREE.Color) => {
        this.#instance.setClearColor(newColor);
      });

    folder.add(this.#instance.shadowMap, "enabled").name("shadowMap.enabled");
    folder.add(this.#instance.shadowMap, "type", {
      Basic: THREE.BasicShadowMap,
      PCF: THREE.PCFShadowMap,
      PCFSoft: THREE.PCFSoftShadowMap,
    });
  }

  resize() {
    this.#instance.setSize(
      this.#experience.sizes.width,
      this.#experience.sizes.height
    );
    this.#instance.setPixelRatio(this.#experience.sizes.pixelRatio);
  }

  update() {
    this.#instance.render(
      this.#experience.scene,
      this.#experience.camera.instance
    );
  }
}
