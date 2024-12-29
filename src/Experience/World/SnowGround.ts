import * as THREE from "three";

import Experience from "../Experience.ts";

export default class SnowGround {
  #experience = new Experience();
  #geometry: THREE.PlaneGeometry;
  #textures: {
    alpha?: THREE.Texture;
    normal?: THREE.Texture;
    arm?: THREE.Texture;
    displacement?: THREE.Texture;
  } = {};
  #material: THREE.MeshStandardMaterial;
  #mesh: THREE.Mesh;

  constructor() {
    this.#setGeometry();
    this.#setTextures();
    this.#setMaterial();
    this.#setMesh();
  }

  #setGeometry() {
    this.#geometry = new THREE.PlaneGeometry(12, 12, 100, 100);
  }

  #setTextures() {
    // Alpha
    this.#textures.alpha = this.#experience.assets.assetsLoaded
      .snowGroundAlphaTexture as THREE.Texture;

    // Normal
    this.#textures.normal = this.#experience.assets.assetsLoaded
      .snowGroundNormalTexture as THREE.Texture;
    this.#textures.normal.repeat.setScalar(5);
    this.#textures.normal.wrapS = THREE.RepeatWrapping;
    this.#textures.normal.wrapT = THREE.RepeatWrapping;

    // ARM
    this.#textures.arm = this.#experience.assets.assetsLoaded
      .snowGroundARMTexture as THREE.Texture;
    this.#textures.arm.repeat.setScalar(5);
    this.#textures.arm.wrapS = THREE.RepeatWrapping;
    this.#textures.arm.wrapT = THREE.RepeatWrapping;

    // Displacement
    this.#textures.displacement = this.#experience.assets.assetsLoaded
      .snowGroundDisplacementTexture as THREE.Texture;
    this.#textures.displacement.repeat.setScalar(1);
  }

  #setMaterial() {
    this.#material = new THREE.MeshStandardMaterial({
      transparent: true,
      alphaMap: this.#textures.alpha,
      normalMap: this.#textures.normal,
      aoMap: this.#textures.arm,
      roughnessMap: this.#textures.arm,
      metalnessMap: this.#textures.arm,
      displacementMap: this.#textures.displacement,
      displacementScale: 3,
    });
  }

  #setMesh() {
    this.#mesh = new THREE.Mesh(this.#geometry, this.#material);
    this.#mesh.rotation.x = -Math.PI / 2;
    this.#mesh.castShadow = true;
    this.#mesh.receiveShadow = true;
    this.#experience.scene.add(this.#mesh);
  }
}
