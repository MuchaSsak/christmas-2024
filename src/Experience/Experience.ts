import * as THREE from "three";

import Debug from "./Utils/Debug.ts";
import Sizes from "./Utils/Sizes.ts";
import Time from "./Utils/Time.ts";
import Assets from "./Utils/Assets.ts";
import Camera from "./Camera.ts";
import Renderer from "./Renderer.ts";
import World from "./World/World.ts";

let instance: Experience | null = null;

export default class Experience {
  canvas: HTMLCanvasElement;
  debug: Debug;
  sizes: Sizes;
  time: Time;
  scene: THREE.Scene;
  assets: Assets;
  camera: Camera;
  renderer: Renderer;
  world: World;

  constructor(canvas?: HTMLCanvasElement) {
    // Singleton
    if (instance) return instance;
    instance = this;

    // Options
    if (canvas) this.canvas = canvas;

    // Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.assets = new Assets();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();

    // Resize event
    this.sizes.on("resize", () => {
      this.#resize();
    });

    // New frame event
    this.time.on("tick", () => {
      this.#update();
    });
  }

  #resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  #update() {
    this.renderer.update();
  }
}
