import type { AudioLoader, Texture, TextureLoader } from "three";
import type {
  Font,
  FontLoader,
  GLTF,
  GLTFLoader,
} from "three/examples/jsm/Addons.js";

export type Loaders = {
  gltfLoader?: GLTFLoader;
  textureLoader?: TextureLoader;
  fontLoader?: FontLoader;
  audioLoader?: AudioLoader;
};

export type AssetSource = {
  name: keyof AssetsLoaded;
  loader: keyof Loaders;
  path: string;
};

export type AssetTypes = GLTF | Texture | Font | AudioBuffer;

export type AssetsLoaded = {
  snowGroundAlphaTexture?: AssetTypes;
  snowGroundDisplacementTexture?: AssetTypes;
  snowGroundNormalTexture?: AssetTypes;
  snowGroundARMTexture?: AssetTypes;
  snowParticlesAlphaTexture?: AssetTypes;
  snowmanModel?: AssetTypes;
  berkshireFont?: AssetTypes;
  silverMatcapTexture?: AssetTypes;
  treeModel?: AssetTypes;
  musicSound?: AssetTypes;
};

export default [
  {
    name: "snowGroundAlphaTexture",
    loader: "textureLoader",
    path: "/textures/snowGround/alpha.jpg",
  },
  {
    name: "snowGroundDisplacementTexture",
    loader: "textureLoader",
    path: "/textures/snowGround/displacement.jpg",
  },
  {
    name: "snowGroundNormalTexture",
    loader: "textureLoader",
    path: "/textures/snowGround/normal.png",
  },
  {
    name: "snowGroundARMTexture",
    loader: "textureLoader",
    path: "/textures/snowGround/arm.jpg",
  },
  {
    name: "snowParticlesAlphaTexture",
    loader: "textureLoader",
    path: "/textures/snowParticles/alpha.png",
  },
  {
    name: "snowmanModel",
    loader: "gltfLoader",
    path: "/models/snowman/scene.gltf",
  },
  {
    name: "berkshireFont",
    loader: "fontLoader",
    path: "/fonts/Berkshire_Swash_Regular.json",
  },
  {
    name: "silverMatcapTexture",
    loader: "textureLoader",
    path: "/textures/matcaps/silver.jpg",
  },
  {
    name: "treeModel",
    loader: "gltfLoader",
    path: "/models/tree/model.gltf",
  },
  {
    name: "musicSound",
    loader: "audioLoader",
    path: "/sounds/music.ogg",
  },
] as AssetSource[];
