import * as THREE from "three";
import { GLTFLoader, FontLoader } from "three/examples/jsm/Addons.js";

import assetsToLoad, {
  type Loaders,
  type AssetSource,
  type AssetsLoaded,
  AssetTypes,
} from "../assetsList.ts";
import EventEmitter from "./EventEmitter.ts";

export default class Assets extends EventEmitter {
  assetsLoaded: AssetsLoaded = {};
  #amountLoaded = 0;
  #loaders: Loaders = {};

  constructor() {
    super();

    this.#initLoaders();
    this.#startLoadingAll();
  }

  #initLoaders() {
    this.#loaders.gltfLoader = new GLTFLoader();
    this.#loaders.textureLoader = new THREE.TextureLoader();
    this.#loaders.fontLoader = new FontLoader();
    this.#loaders.audioLoader = new THREE.AudioLoader();
  }

  #startLoadingAll() {
    // Load every asset
    for (const asset of assetsToLoad) {
      this.#loaders[asset.loader]!.load(
        asset.path,
        (file) => {
          this.#onFinishLoadingAsset(asset, file);
        },
        undefined,
        () => {
          throw new Error("Incorrect asset path");
        }
      );
    }
  }

  #onFinishLoadingAsset(asset: AssetSource, file: AssetTypes) {
    this.assetsLoaded[asset.name] = file;

    this.#amountLoaded++;

    if (this.#amountLoaded === assetsToLoad.length) {
      this.trigger("ready");
    }
  }
}
