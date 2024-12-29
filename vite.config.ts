import type { UserConfig } from "vite";

export default {
  build: {
    assetsInlineLimit: 0,
  },
  assetsInclude: ["**/*.gltf", "**/*.ogg", "**/*.glb", "**/*.json"],
} satisfies UserConfig;
