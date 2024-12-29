import * as THREE from "three";
import { type Font, TextGeometry } from "three/examples/jsm/Addons.js";
import gsap from "gsap";

import Experience from "../Experience.ts";

export default class Title {
  #experience = new Experience();
  #geometry: TextGeometry;
  #material: THREE.MeshMatcapMaterial;
  #mesh: THREE.Mesh;
  options = {
    yStartingPosition: 6,
    yFinalPosition: 4,
  };

  constructor() {
    this.#setGeometry();
    this.#setMaterial();
    this.#setMesh();
    this.#setAnimation();
    this.#setDebug();
  }

  #setGeometry() {
    this.#geometry = new TextGeometry("Happy Christmas! :)", {
      font: this.#experience.assets.assetsLoaded.berkshireFont as Font,
      size: 0.3,
      depth: 0.1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 5,
    });

    this.#geometry.center();
  }

  #setMaterial() {
    this.#material = new THREE.MeshMatcapMaterial({
      transparent: true,
      opacity: 0,
      matcap: this.#experience.assets.assetsLoaded
        .silverMatcapTexture as THREE.Texture,
    });
  }

  #setMesh() {
    this.#mesh = new THREE.Mesh(this.#geometry, this.#material);

    this.#mesh.position.set(2, this.options.yStartingPosition, 0);
    this.#mesh.rotation.y = Math.PI / 2;

    // Rotate on the z axis
    const quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), -0.1);
    this.#mesh.applyQuaternion(quaternion);

    this.#experience.scene.add(this.#mesh);
  }

  #setAnimation() {
    gsap.to(this.#material, {
      opacity: 1,
      delay: 2,
      duration: 1,
      ease: "circ.in",
    });
    gsap.to(this.#mesh.position, {
      y: this.options.yFinalPosition,
      delay: 2,
      duration: 3,
      ease: "elastic(0.35,0)",
    });
  }

  #setDebug() {
    if (!this.#experience.debug.ui) return;

    const folder = this.#experience.debug.ui.addFolder("Title");

    ["x", "y", "z"].forEach((axis) => {
      folder
        .add(this.#mesh.position, axis as keyof THREE.Vector3)
        .min(-50)
        .max(50)
        .step(0.001)
        .name(`position.${axis}`);
    });

    ["x", "y", "z"].forEach((axis) => {
      folder
        .add(this.#mesh.rotation, axis as keyof THREE.Euler)
        .min(0)
        .max(Math.PI * 2)
        .step(0.001)
        .name(`rotation.${axis}`);
    });
  }
}
