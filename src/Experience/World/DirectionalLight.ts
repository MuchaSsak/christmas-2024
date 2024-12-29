import * as THREE from "three";

import Experience from "../Experience.ts";

const color = "#ffe294";

export default class DirectionalLight {
  #experience = new Experience();
  #instance: THREE.DirectionalLight;
  #helpers: any[] = [];
  color = color;

  constructor() {
    this.#setInstance();
    this.#setHelpers();
    this.#setDebug();
  }

  #setInstance() {
    this.#instance = new THREE.DirectionalLight(this.color, 0.97);
    this.#instance.castShadow = true;
    this.#instance.shadow.camera.far = 200;
    this.#instance.shadow.mapSize.setScalar(512);
    this.#instance.shadow.normalBias = 0.05;
    this.#instance.position.set(30.576, 4.502, -22.876);
    this.#instance.target.position.set(-1.328, 1.8, 0.5);
    this.#experience.scene.add(this.#instance, this.#instance.target);
  }

  #setHelpers() {
    // Directional light helper
    const directionalLightHelper = new THREE.DirectionalLightHelper(
      this.#instance,
      1,
      this.color
    );
    directionalLightHelper.visible = this.#experience.debug.helpersEnabled;

    // Directional light shadow camera helper
    const directionalLightShadowCameraHelper = new THREE.CameraHelper(
      this.#instance.shadow.camera
    );
    directionalLightShadowCameraHelper.visible =
      this.#experience.debug.helpersEnabled;

    // Add to array
    this.#helpers.push(
      directionalLightHelper,
      directionalLightShadowCameraHelper
    );

    this.#experience.scene.add(...this.#helpers);
  }

  toggleHelpers() {
    this.#helpers.forEach((helper) => {
      helper.visible = this.#experience.debug.helpersEnabled;
    });
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const folder = this.#experience.debug.ui.addFolder("DirectionalLight");

    folder.addColor(this, "color").onFinishChange((newColor: THREE.Color) => {
      this.#instance.color.set(newColor);
    });
    folder.add(this.#instance, "intensity").min(0).max(5).step(0.01);

    folder.add(this.#instance, "castShadow");
    folder
      .add(this.#instance.shadow, "normalBias")
      .min(-5)
      .max(5)
      .step(0.01)
      .name("shadow.normalBias");

    ["x", "y", "z"].forEach((axis) => {
      folder
        .add(this.#instance.position, axis as keyof THREE.Vector3)
        .min(-50)
        .max(50)
        .step(0.001)
        .name(`position.${axis}`)
        .onFinishChange(() => {
          this.#helpers.forEach((helper) => {
            helper.update?.();
          });
        });
    });

    ["x", "y", "z"].forEach((axis) => {
      folder
        .add(this.#instance.target.position, axis as keyof THREE.Vector3)
        .min(-50)
        .max(50)
        .step(0.001)
        .name(`target.position.${axis}`)
        .onFinishChange(() => {
          this.#helpers.forEach((helper) => {
            helper.update?.();
          });
        });
    });
  }
}
