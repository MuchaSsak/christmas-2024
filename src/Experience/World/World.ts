import Experience from "../Experience.ts";
import SnowGround from "./SnowGround.ts";
import AmbientLight from "./AmbientLight.ts";
import DirectionalLight from "./DirectionalLight.ts";
import Fog from "./Fog.ts";
import SnowParticles from "./SnowParticles.ts";
import Music from "./Music.ts";
import Snowman from "./Snowman.ts";
import Title from "./Title.ts";
import Trees from "./Trees.ts";

export default class World {
  #experience = new Experience();
  #objectsToInitialize = [
    SnowGround,
    AmbientLight,
    DirectionalLight,
    Fog,
    SnowParticles,
    Music,
    Snowman,
    Title,
    Trees,
  ];
  #initializedObjects: any[] = [
    this.#experience.renderer,
    this.#experience.camera,
  ];

  constructor() {
    // Wait for assets to load
    this.#experience.assets.on("ready", () => {
      // Initialize every object and add to the array
      this.#objectsToInitialize.forEach((Object) => {
        this.#initializedObjects.push(new Object());
      });

      // Toggle helpers in debug
      this.#experience.debug.on("toggleHelpers", () => {
        this.#toggleHelpers();
      });
    });
  }

  #toggleHelpers() {
    this.#initializedObjects.forEach((Object) => {
      Object.toggleHelpers?.();
    });
  }
}
